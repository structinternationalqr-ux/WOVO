import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Pin, Settings, Lock, X, Check, Plus, Trash2, ImagePlus, Loader2 } from 'lucide-react';
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

const ADMIN_PASSWORD = 'sfter';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAdmin, setShowAdmin] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    website_link: '',
    business_type: '',
    pricing_tier: 'Essential',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPwError('');
    } else {
      setPwError('Incorrect password');
    }
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function uploadImage(file: File): Promise<string | null> {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error || !data) return null;
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path);
    return urlData.publicUrl;
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    let image_url: string | null = null;
    if (imageFile) {
      image_url = await uploadImage(imageFile);
    }

    const { error } = await supabase.from('projects').insert([{ ...formData, image_url }]);
    setUploading(false);

    if (!error) {
      setFormData({ name: '', website_link: '', business_type: '', pricing_tier: 'Essential' });
      setImageFile(null);
      setImagePreview(null);
      setShowAddForm(false);
      fetchProjects();
    }
  }

  function resetForm() {
    setFormData({ name: '', website_link: '', business_type: '', pricing_tier: 'Essential' });
    setImageFile(null);
    setImagePreview(null);
    setShowAddForm(false);
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

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-0 w-96 h-96 bg-white/[0.025] rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-platinum mb-6">Our Work</h1>
          <p className="text-silver/70 text-xl sm:text-2xl max-w-2xl mx-auto">
            Explore some of the projects we have delivered for our clients.
          </p>
        </motion.div>

        {/* Admin gear */}
        <div className="flex justify-end mb-8">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdmin(true)}
            className="p-3 rounded-xl glass hover:bg-white/10 transition-colors text-silver hover:text-platinum"
            title="Admin Settings"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Admin Modal */}
        <AnimatePresence>
          {showAdmin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm p-4"
              onClick={() => {
                setShowAdmin(false);
                setAuthenticated(false);
                setPassword('');
                setPwError('');
                resetForm();
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-8 glow-border w-full max-w-lg max-h-[85vh] overflow-y-auto"
              >
                {!authenticated ? (
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-platinum mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-platinum mb-2">Admin Access</h2>
                    <p className="text-silver/60 text-sm mb-6">Enter password to manage projects.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all text-center"
                      />
                      {pwError && <p className="text-red-400 text-sm">{pwError}</p>}
                      <button type="submit" className="w-full btn-primary py-3">Unlock</button>
                    </form>
                    <button
                      onClick={() => setShowAdmin(false)}
                      className="mt-4 text-sm text-silver/50 hover:text-platinum transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-platinum">Manage Projects</h2>
                      <button onClick={() => setShowAdmin(false)} className="p-1 text-silver/60 hover:text-platinum">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="btn-primary inline-flex items-center gap-2 px-4 py-2 mb-6"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>

                    <AnimatePresence>
                      {showAddForm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6 overflow-hidden"
                        >
                          <form onSubmit={handleAddProject} className="space-y-3">
                            <input
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all"
                              placeholder="Project Name *"
                            />
                            <input
                              value={formData.website_link}
                              onChange={(e) => setFormData({ ...formData, website_link: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all"
                              placeholder="Website Link"
                            />
                            <input
                              value={formData.business_type}
                              onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum placeholder:text-silver/30 focus:outline-none focus:border-white/30 transition-all"
                              placeholder="Business Type"
                            />
                            <select
                              value={formData.pricing_tier}
                              onChange={(e) => setFormData({ ...formData, pricing_tier: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-graphite/50 border border-white/10 text-platinum focus:outline-none focus:border-white/30 transition-all"
                            >
                              <option value="Essential">Essential</option>
                              <option value="Professional">Professional</option>
                              <option value="Enterprise">Enterprise</option>
                            </select>

                            {/* Image Upload */}
                            <div>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleImageSelect}
                                className="hidden"
                              />
                              {imagePreview ? (
                                <div className="relative rounded-xl overflow-hidden aspect-video">
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => { setImagePreview(null); setImageFile(null); }}
                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-void/80 flex items-center justify-center text-silver hover:text-platinum"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg glass text-xs text-platinum"
                                  >
                                    Change
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-8 rounded-xl border border-dashed border-white/20 hover:border-white/40 transition-colors flex flex-col items-center gap-2 text-silver/60 hover:text-silver"
                                >
                                  <ImagePlus className="w-6 h-6" />
                                  <span className="text-sm">Click to add project image</span>
                                  <span className="text-xs text-silver/40">JPEG, PNG, WebP, GIF</span>
                                </button>
                              )}
                            </div>

                            <div className="flex gap-3">
                              <button
                                type="submit"
                                disabled={uploading}
                                className="btn-primary px-4 py-2 inline-flex items-center gap-2 disabled:opacity-50"
                              >
                                {uploading ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )}
                                {uploading ? 'Uploading...' : 'Done'}
                              </button>
                              <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 rounded-xl text-silver hover:text-platinum transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-2">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="glass rounded-xl p-4 flex items-center justify-between gap-4"
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
                              <div className="flex items-center gap-2">
                                <span className="text-platinum font-medium truncate">{project.name}</span>
                                {project.pinned && <Pin className="w-3 h-3 text-platinum fill-platinum flex-shrink-0" />}
                              </div>
                              {project.business_type && (
                                <span className="text-xs text-silver/40 truncate block">{project.business_type}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => togglePin(project)}
                              className={`p-2 rounded-lg transition-colors ${
                                project.pinned ? 'bg-white/10 text-platinum' : 'text-silver/40 hover:text-platinum'
                              }`}
                            >
                              <Pin className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="p-2 rounded-lg text-silver/40 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {projects.length === 0 && (
                        <p className="text-silver/40 text-center py-4">No projects yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-platinum/30 border-t-platinum rounded-full animate-spin" />
          </div>
        ) : sortedProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-silver/50 text-lg">No projects added yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-full glass rounded-2xl overflow-hidden card-hover glow-border">
                  {project.pinned && (
                    <div className="absolute top-4 right-4 z-10">
                      <Pin className="w-4 h-4 text-platinum fill-platinum" />
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="w-full aspect-video bg-gradient-to-br from-graphite to-slate relative overflow-hidden">
                    {project.image_url ? (
                      <motion.img
                        src={project.image_url}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-bold text-white/10">
                          {project.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-platinum mb-1">{project.name}</h3>
                      {project.business_type && (
                        <p className="text-sm text-silver/55">{project.business_type}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.pricing_tier && (
                        <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-silver/70">
                          {project.pricing_tier}
                        </span>
                      )}
                    </div>

                    {project.website_link && (
                      <a
                        href={project.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-platinum hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
