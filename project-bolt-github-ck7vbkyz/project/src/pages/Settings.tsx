import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pin, Trash2, Eye, Lock, X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  name: string;
  website_link: string | null;
  business_type: string | null;
  pricing_tier: string | null;
  image_url: string | null;
  pinned: boolean;
  created_at: string;
}

interface VisitorLog {
  id: string;
  page: string;
  visited_at: string;
}

const ADMIN_PASSWORD = 'sfter6789';

export default function Settings() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'logs'>('projects');

  const [formData, setFormData] = useState({
    name: '',
    website_link: '',
    business_type: '',
    pricing_tier: 'Essential',
  });

  useEffect(() => {
    if (authenticated) {
      fetchProjects();
      fetchLogs();
    }
  }, [authenticated]);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProjects(data);
  }

  async function fetchLogs() {
    const { data, error } = await supabase
      .from('visitor_logs')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(200);
    if (!error && data) setLogs(data);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([formData]);
    if (!error) {
      setFormData({ name: '', website_link: '', business_type: '', pricing_tier: 'Essential' });
      setShowAddForm(false);
      fetchProjects();
    }
  }

  async function togglePin(project: Project) {
    const { error } = await supabase
      .from('projects')
      .update({ pinned: !project.pinned })
      .eq('id', project.id);
    if (!error) fetchProjects();
  }

  async function deleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  }

  if (!authenticated) {
    return (
      <div className="relative min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md mx-4"
        >
          <div className="glass rounded-2xl p-8 glow-border text-center">
            <Lock className="w-12 h-12 text-platinum mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-platinum mb-2">Settings</h1>
            <p className="text-silver/60 text-sm mb-6">Enter the admin password to access settings.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all text-center"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="w-full btn-primary py-3">
                Unlock
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-platinum mb-2">Settings</h1>
          <p className="text-silver/60">Manage projects and view visitor analytics.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'projects' ? 'bg-white/10 text-platinum' : 'text-silver/60 hover:text-platinum'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'logs' ? 'bg-white/10 text-platinum' : 'text-silver/60 hover:text-platinum'
            }`}
          >
            Visitor Logs ({logs.length})
          </button>
        </div>

        {activeTab === 'projects' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-platinum">Projects</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary inline-flex items-center gap-2 px-4 py-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="glass rounded-2xl p-6 glow-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-platinum">Add New Project</h3>
                      <button onClick={() => setShowAddForm(false)} className="p-1 text-silver/60 hover:text-platinum">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleAddProject} className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-silver/60 mb-1">Project Name</label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all"
                          placeholder="My Project"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-silver/60 mb-1">Website Link</label>
                        <input
                          value={formData.website_link}
                          onChange={(e) => setFormData({ ...formData, website_link: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-silver/60 mb-1">Business Type</label>
                        <input
                          value={formData.business_type}
                          onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all"
                          placeholder="E-commerce, Portfolio..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-silver/60 mb-1">Pricing Tier</label>
                        <select
                          value={formData.pricing_tier}
                          onChange={(e) => setFormData({ ...formData, pricing_tier: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum focus:outline-none focus:border-white/30 transition-all"
                        >
                          <option value="Essential">Essential</option>
                          <option value="Professional">Professional</option>
                          <option value="Enterprise">Enterprise</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 flex gap-3">
                        <button type="submit" className="btn-primary px-6 py-2.5 inline-flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Done
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-6 py-2.5 rounded-xl text-silver hover:text-platinum transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-platinum truncate">{project.name}</h3>
                        {project.pinned && <Pin className="w-3.5 h-3.5 text-platinum fill-platinum flex-shrink-0" />}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-silver/50">
                        {project.business_type && <span>{project.business_type}</span>}
                        {project.pricing_tier && <span className="px-2 py-0.5 rounded-full bg-white/5">{project.pricing_tier}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => togglePin(project)}
                      className={`p-2 rounded-lg transition-colors ${
                        project.pinned ? 'bg-white/10 text-platinum' : 'text-silver/40 hover:text-platinum hover:bg-white/5'
                      }`}
                      title={project.pinned ? 'Unpin' : 'Pin'}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-2 rounded-lg text-silver/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
              {projects.length === 0 && (
                <p className="text-silver/40 text-center py-8">No projects yet. Click + to add one.</p>
              )}
            </div>
          </>
        )}

        {activeTab === 'logs' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-platinum">Visitor Logs</h2>
              <div className="flex items-center gap-2 text-sm text-silver/50">
                <Eye className="w-4 h-4" />
                {logs.length} entries
              </div>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-lg px-5 py-3 flex items-center justify-between"
                >
                  <span className="text-platinum font-medium">{log.page}</span>
                  <span className="text-xs text-silver/40">
                    {new Date(log.visited_at).toLocaleString()}
                  </span>
                </motion.div>
              ))}
              {logs.length === 0 && (
                <p className="text-silver/40 text-center py-8">No visitor logs yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
