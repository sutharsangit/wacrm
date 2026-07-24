'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { 
  Megaphone, 
  Plus, 
  Send, 
  Clock, 
  Users, 
  FileText, 
  Upload, 
  Check, 
  Loader2,
  TrendingUp,
  Percent,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function WhatsAppBroadcast() {
  const { campaigns, templates, launchCampaign } = useChatStore();

  const [showModal, setShowModal] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [targetAudience, setTargetAudience] = useState<'Qualified' | 'Warm' | 'Cold' | 'csv'>('Qualified');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [templateId, setTemplateId] = useState('');
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);

  const selectedTemplate = templates.find(t => t.id === templateId);

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName.trim() || !templateId) return;

    setIsLaunching(true);
    // Mimic API delay
    await launchCampaign(
      campaignName, 
      templateId
    );
    setIsLaunching(false);
    setShowModal(false);
    
    // Reset states
    setCampaignName('');
    setTemplateId('');
    setCsvFile(null);
    setScheduleType('now');
    setScheduleDate('');
    setScheduleTime('');
    alert('Campaign Broadcast Scheduled/Dispatched Successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Campaign Broadcasts</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Dispatch bulk message templates to targeted lead segments or uploaded phone lists.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-black font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-secondary/15 border border-border p-4 rounded-xl">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Average Delivery Rate</span>
          <span className="text-lg font-bold text-foreground block mt-1 font-mono">98.4%</span>
        </div>
        <div className="bg-secondary/15 border border-border p-4 rounded-xl">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Average Open Rate</span>
          <span className="text-lg font-bold text-foreground block mt-1 font-mono">84.2%</span>
        </div>
        <div className="bg-secondary/15 border border-border p-4 rounded-xl">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Average Reply Rate</span>
          <span className="text-lg font-bold text-primary block mt-1 font-mono">31.6%</span>
        </div>
      </div>

      {/* Campaign History Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-border/80 bg-secondary/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Campaign Dispatch History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground font-semibold bg-secondary/5">
                <th className="p-3">Campaign Name</th>
                <th className="p-3">Template</th>
                <th className="p-3">Sent</th>
                <th className="p-3">Delivered Rate</th>
                <th className="p-3">Open Rate</th>
                <th className="p-3">Reply Rate</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {campaigns.map((camp) => {
                const deliveryRate = camp.sentCount > 0 ? ((camp.deliveredCount / camp.sentCount) * 100).toFixed(1) : '0';
                const openRate = camp.deliveredCount > 0 ? ((camp.readCount / camp.deliveredCount) * 100).toFixed(1) : '0';
                // Mock reply rates
                const replyRate = camp.status === 'Completed' ? '32.4%' : '--';

                return (
                  <tr key={camp.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-3 font-bold text-foreground">{camp.name}</td>
                    <td className="p-3 text-muted-foreground truncate max-w-[150px]">{camp.templateName}</td>
                    <td className="p-3 font-mono">{camp.sentCount}</td>
                    <td className="p-3 font-mono">{camp.status === 'Completed' ? `${deliveryRate}%` : '--'}</td>
                    <td className="p-3 font-mono text-primary font-bold">{camp.status === 'Completed' ? `${openRate}%` : '--'}</td>
                    <td className="p-3 font-mono text-purple-500 font-semibold">{replyRate}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                        camp.status === 'Completed' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground font-mono">{new Date(camp.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    No campaigns launched yet. Click "Create Campaign" to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full relative animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Launch New Campaign Broadcast</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Send a message template to thousands of leads instantly.</p>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              {/* Campaign Name */}
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Campaign Identifier Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. August Webinar Invites"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Select Audience */}
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Target Audience Pool</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'Qualified', label: 'Qualified Leads' },
                    { id: 'Warm', label: 'Warm Leads' },
                    { id: 'Cold', label: 'Cold Leads' },
                    { id: 'csv', label: 'CSV Upload' },
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setTargetAudience(aud.id as any)}
                      className={`py-1.5 font-semibold text-center border rounded-lg transition-all ${
                        targetAudience === aud.id 
                          ? 'bg-primary border-primary text-black' 
                          : 'bg-muted border-border text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CSV Upload form */}
              {targetAudience === 'csv' && (
                <div className="border border-dashed border-border p-4 rounded-lg text-center space-y-2">
                  <div className="flex justify-center"><Upload className="w-6 h-6 text-muted-foreground" /></div>
                  <span className="text-[10px] font-semibold text-muted-foreground block">Upload Phone List CSV</span>
                  <label className="cursor-pointer bg-secondary hover:bg-secondary/80 border border-border px-3 py-1.5 rounded text-[10px] font-bold inline-block">
                    <span>{csvFile ? csvFile.name : 'Select CSV File'}</span>
                    <input type="file" accept=".csv" onChange={handleCsvChange} className="hidden" />
                  </label>
                </div>
              )}

              {/* Select Template */}
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Message Template</label>
                <select
                  required
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground focus:outline-none focus:border-primary"
                >
                  <option value="">Select approved template...</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                  ))}
                </select>
              </div>

              {/* Template Live Preview */}
              {selectedTemplate && (
                <div className="bg-secondary/40 border border-border p-3.5 rounded-lg space-y-1.5">
                  <span className="text-[9px] uppercase font-bold text-primary block">Template Preview:</span>
                  <p className="text-xs text-muted-foreground italic font-mono leading-relaxed bg-card p-2 border border-border/40 rounded">
                    {selectedTemplate.body}
                  </p>
                </div>
              )}

              {/* Scheduling Options */}
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Scheduling Method</label>
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-1.5 font-semibold text-foreground cursor-pointer">
                    <input 
                      type="radio" 
                      name="schedule" 
                      checked={scheduleType === 'now'}
                      onChange={() => setScheduleType('now')}
                      className="text-primary focus:ring-primary w-4 h-4 bg-muted border-border"
                    />
                    <span>Send Now</span>
                  </label>
                  <label className="flex items-center gap-1.5 font-semibold text-foreground cursor-pointer">
                    <input 
                      type="radio" 
                      name="schedule" 
                      checked={scheduleType === 'later'}
                      onChange={() => setScheduleType('later')}
                      className="text-primary focus:ring-primary w-4 h-4 bg-muted border-border"
                    />
                    <span>Schedule for later</span>
                  </label>
                </div>

                {scheduleType === 'later' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input 
                      type="date" 
                      required
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="bg-muted border border-border rounded px-2.5 py-1.5 text-xs text-foreground"
                    />
                    <input 
                      type="time" 
                      required
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="bg-muted border border-border rounded px-2.5 py-1.5 text-xs text-foreground"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLaunching || !campaignName.trim() || !templateId}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5 shadow-lg shadow-primary/10"
                >
                  {isLaunching && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Launch Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
