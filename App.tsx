
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BloodTypeCard from './components/BloodTypeCard';
import BloodTypeBadge from './components/BloodTypeBadge';
import { UserRole, BloodInventory, BloodRequest, Donor } from './types';
import { BLOOD_GROUPS, MOCK_REQUESTS, MOCK_DONORS } from './constants';
import { getInventoryInsights } from './services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Droplet, UserPlus, FileText, LayoutDashboard, Database, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('GUEST');
  const [inventory, setInventory] = useState<BloodInventory[]>(BLOOD_GROUPS);
  const [requests, setRequests] = useState<BloodRequest[]>(MOCK_REQUESTS);
  const [donors] = useState<Donor[]>(MOCK_DONORS);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const insights = await getInventoryInsights(inventory, requests);
      setAiInsights(insights || 'No insights available at this moment.');
      setLoadingInsights(false);
    };
    if (role === 'ADMIN' || role === 'HOSPITAL') {
      fetchInsights();
    }
  }, [role, inventory, requests]);

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role={role} setRole={setRole} />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        {role === 'GUEST' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* Hero */}
            <section className="text-center py-16 blood-gradient rounded-3xl text-white px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Saving Lives Starts With You.</h1>
              <p className="text-lg md:text-xl text-red-50 max-w-2xl mx-auto mb-10">
                A modern, efficient platform connecting donors with patients and hospitals.
                Secure, real-time, and community-driven.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setRole('DONOR')}
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  Become a Donor
                </button>
                <button 
                  onClick={() => setRole('HOSPITAL')}
                  className="bg-red-800/40 backdrop-blur-md border border-red-400/30 text-white px-8 py-3 rounded-full font-bold hover:bg-red-800/60 transition-colors"
                >
                  Hospital Login
                </button>
              </div>
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <Droplet className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-slate-500 text-sm font-medium">Available Units</h3>
                <p className="text-3xl font-bold text-slate-900">{totalUnits}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <UserPlus className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h3 className="text-slate-500 text-sm font-medium">Registered Donors</h3>
                <p className="text-3xl font-bold text-slate-900">1,240+</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <Activity className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-slate-500 text-sm font-medium">Lives Impacted</h3>
                <p className="text-3xl font-bold text-slate-900">8,500+</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <FileText className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h3 className="text-slate-500 text-sm font-medium">Hospitals Linked</h3>
                <p className="text-3xl font-bold text-slate-900">42</p>
              </div>
            </div>

            {/* Inventory Preview */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Live Inventory Status</h2>
                <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">Real-time</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {inventory.map(item => (
                  <BloodTypeCard key={item.type} data={item} />
                ))}
              </div>
            </section>
          </div>
        )}

        {(role === 'ADMIN' || role === 'HOSPITAL') && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {role === 'ADMIN' ? 'Admin Control Center' : 'Hospital Operations'}
                </h1>
                <p className="text-slate-500">Managing inventory, requests, and system health.</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  <Database className="w-4 h-4" />
                  Export Data
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                  <UserPlus className="w-4 h-4" />
                  New Donor
                </button>
              </div>
            </div>

            {/* AI Insights Panel */}
            <section className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Sparkles className="w-24 h-24 text-indigo-500" />
              </div>
              <div className="flex items-center gap-2 mb-4 text-indigo-700">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wider text-sm">AI Demand Forecast & Insights</h3>
              </div>
              {loadingInsights ? (
                <div className="flex items-center gap-3 py-4 text-slate-400">
                   <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                   <span>Analyzing inventory and request history...</span>
                </div>
              ) : (
                <div className="prose prose-sm prose-indigo max-w-none text-slate-600 whitespace-pre-line leading-relaxed">
                  {aiInsights}
                </div>
              )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Stats & Chart */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-500" />
                      Inventory Distribution
                    </h3>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={inventory}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                          cursor={{fill: '#f8fafc'}}
                        />
                        <Bar dataKey="units" radius={[4, 4, 0, 0]} barSize={40}>
                          {inventory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.units <= entry.criticalLevel ? '#ef4444' : '#3b82f6'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Request Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 text-red-500" />
                      Recent Blood Requests
                    </h3>
                    <span className="text-xs text-slate-400">Latest 10 entries</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Hospital</th>
                          <th className="px-6 py-4 font-semibold">Group</th>
                          <th className="px-6 py-4 font-semibold text-center">Units</th>
                          <th className="px-6 py-4 font-semibold">Urgency</th>
                          <th className="px-6 py-4 font-semibold">Status</th>
                          <th className="px-6 py-4 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {requests.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-slate-900">{req.hospitalName}</div>
                              <div className="text-[10px] text-slate-400">{new Date(req.timestamp).toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4"><BloodTypeBadge type={req.bloodGroup} /></td>
                            <td className="px-6 py-4 text-center font-bold text-slate-700">{req.unitsRequested}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                req.urgency === 'Emergency' ? 'bg-red-100 text-red-600 border-red-200' :
                                req.urgency === 'High' ? 'bg-amber-100 text-amber-600 border-amber-200' :
                                'bg-blue-100 text-blue-600 border-blue-200'
                              }`}>
                                {req.urgency}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  req.status === 'Approved' ? 'bg-emerald-500' :
                                  req.status === 'Pending' ? 'bg-amber-500 animate-pulse' :
                                  'bg-slate-300'
                                }`}></div>
                                <span className="text-sm text-slate-600">{req.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-xs font-semibold text-red-600 hover:text-red-700">Manage</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Alerts & Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Critical Alerts
                  </h3>
                  <div className="space-y-3">
                    {inventory.filter(i => i.units <= i.criticalLevel).map(item => (
                      <div key={item.type} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <BloodTypeBadge type={item.type} />
                          <div>
                            <div className="text-xs font-bold text-red-900">Critically Low</div>
                            <div className="text-[10px] text-red-600">{item.units} units remaining</div>
                          </div>
                        </div>
                        <button className="p-1.5 hover:bg-red-100 rounded-md transition-colors">
                          <Droplet className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                    {inventory.filter(i => i.units <= i.criticalLevel).length === 0 && (
                      <div className="text-center py-4 text-slate-400 text-sm">All units stable</div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-500" />
                    System Health
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Database Uptime</span>
                      <span className="text-emerald-400">99.98%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[99.98%]"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Avg Response Time</span>
                      <span className="text-slate-200">142ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Encryption Status</span>
                      <span className="text-blue-400">AES-256 Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {role === 'DONOR' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Join the Hero Network</h1>
              <p className="text-slate-600">Complete your profile to start donating and saving lives today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                 <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <UserPlus className="w-6 h-6 text-red-600" />
                   Donor Registration
                 </h3>
                 <div className="space-y-4">
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                     <input type="text" placeholder="John Doe" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">Blood Group</label>
                       <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500">
                         {inventory.map(i => <option key={i.type}>{i.type}</option>)}
                       </select>
                     </div>
                     <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">Last Donation</label>
                       <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                     </div>
                   </div>
                   <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-500 uppercase">Contact Number</label>
                     <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                   </div>
                   <button className="w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-colors">
                     Submit Profile
                   </button>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-600 p-8 rounded-2xl shadow-xl text-white">
                  <h3 className="text-xl font-bold mb-4">Why Donate?</h3>
                  <ul className="space-y-4 text-emerald-50">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">✓</div>
                      <span>One donation can save up to three lives.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">✓</div>
                      <span>Regular donation is linked to lower blood pressure and lower risk for heart attacks.</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">✓</div>
                      <span>Help your community and feel a sense of accomplishment.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">Eligibility Quick-Check</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Age Range</span>
                      <span className="font-semibold text-slate-900">18 - 65 years</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Min Weight</span>
                      <span className="font-semibold text-slate-900">50kg (110lbs)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Donation Interval</span>
                      <span className="font-semibold text-slate-900">3-4 Months</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold">P</div>
                <span className="text-xl font-bold">PulseBank</span>
             </div>
             <p className="text-slate-500 max-w-sm">
               Securing the blood supply chain with advanced technology, transparency, and a commitment to saving lives.
             </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li><button onClick={() => setRole('DONOR')} className="hover:text-red-600">Find Donor Centers</button></li>
              <li><button onClick={() => setRole('HOSPITAL')} className="hover:text-red-600">Hospital Portal</button></li>
              <li><a href="#" className="hover:text-red-600">Blood Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-red-600">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li><a href="#" className="hover:text-red-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-600">Data Security</a></li>
              <li><a href="#" className="hover:text-red-600">Regulatory Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 PulseBank Systems. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Server Status: Online</span>
            <span>API Version: v2.5.4</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Core: Gemini 3 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
