'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Settings2, 
  Save, 
  HelpCircle,
  Percent,
  CheckCircle,
  Zap
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'Short Text' | 'Multiple Choice' | 'Dropdown' | 'Yes/No' | 'Number';
  options?: string[];
}

export default function AIQualificationBuilder() {
  // Mock questions
  const [questions, setQuestions] = useState<Question[]>([
    { id: 'q-1', text: 'What service are you looking for?', type: 'Dropdown', options: ['AI CRM Automation', 'Custom Software Development', 'Meta Ads Management', 'Consulting Services'] },
    { id: 'q-2', text: 'Expected Budget?', type: 'Multiple Choice', options: ['Under $10K', '$10K - $30K', '$30K - $50K', 'Over $50K'] },
    { id: 'q-3', text: 'When do you plan to purchase?', type: 'Dropdown', options: ['Within 30 days', '1 - 3 months', '3 - 6 months', 'Not decided'] },
    { id: 'q-4', text: 'Preferred Location?', type: 'Short Text' },
    { id: 'q-5', text: 'Would you like a demo call?', type: 'Yes/No' },
  ]);

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<Question['type']>('Short Text');
  const [newOptionsText, setNewOptionsText] = useState('');

  // Rules parameters
  const [minBudgetRule, setMinBudgetRule] = useState('Over $50K');
  const [timelineRule, setTimelineRule] = useState('Within 30 days');
  const [demoRule, setDemoRule] = useState('Yes');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: newText,
      type: newType,
      options: ['Multiple Choice', 'Dropdown'].includes(newType) && newOptionsText.trim()
        ? newOptionsText.split(',').map(s => s.trim())
        : undefined
    };

    setQuestions([...questions, newQuestion]);
    setNewText('');
    setNewType('Short Text');
    setNewOptionsText('');
    setShowAddModal(false);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...questions];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setQuestions(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === questions.length - 1) return;
    const updated = [...questions];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setQuestions(updated);
  };

  const handleSaveConfig = () => {
    alert('AI Qualification flow saved successfully! The screening chatbot has been updated.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>AI Qualification Builder</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Build conversational pre-screening questions and define matching scoring rules for inbound leads.
          </p>
        </div>
        <button
          onClick={handleSaveConfig}
          className="bg-primary hover:bg-primary/90 text-black font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
        >
          <Save className="w-4 h-4 text-black" />
          <span>Save Builder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Question List & Reordering */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Screening Question Sequence</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="bg-secondary hover:bg-secondary/80 text-foreground border border-border font-semibold px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-3">
              {questions.map((q, index) => (
                <div key={q.id} className="border border-border p-3.5 rounded-xl bg-secondary/5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground font-mono bg-secondary px-1.5 py-0.5 rounded">
                        Q{index + 1}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-primary font-mono">{q.type}</span>
                    </div>
                    <p className="text-xs font-bold text-foreground truncate">{q.text}</p>
                    {q.options && (
                      <p className="text-[10px] text-muted-foreground truncate">
                        Options: {q.options.join(' | ')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 rounded hover:bg-secondary"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === questions.length - 1}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 rounded hover:bg-secondary"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 rounded ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {questions.length === 0 && (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No questions configured. Click "Add Question" to start.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Lead Scoring Rules */}
        <div className="space-y-6">
          {/* Rules Editor */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-3 flex items-center gap-1.5">
              <Settings2 className="w-4 h-4 text-primary" />
              <span>Lead Scoring Logic Rules</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Budget Rule Target</label>
                <select
                  value={minBudgetRule}
                  onChange={(e) => setMinBudgetRule(e.target.value)}
                  className="w-full bg-muted border border-border rounded px-2.5 py-1.5 text-xs text-muted-foreground"
                >
                  <option value="Over $50K">Greater than $50K (Target hot)</option>
                  <option value="$30K - $50K">Greater than $30K</option>
                  <option value="$10K - $30K">Greater than $10K</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Purchase Timeline Target</label>
                <select
                  value={timelineRule}
                  onChange={(e) => setTimelineRule(e.target.value)}
                  className="w-full bg-muted border border-border rounded px-2.5 py-1.5 text-xs text-muted-foreground"
                >
                  <option value="Within 30 days">Within 30 days (Target urgent)</option>
                  <option value="1 - 3 months">Within 90 days</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Demo Call interest Target</label>
                <select
                  value={demoRule}
                  onChange={(e) => setDemoRule(e.target.value)}
                  className="w-full bg-muted border border-border rounded px-2.5 py-1.5 text-xs text-muted-foreground"
                >
                  <option value="Yes">Wants Demo Call (Positive trigger)</option>
                  <option value="No">Does not require demo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scoring Progress visualizer */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-3">Lead Score Bracket</h3>
            
            <div className="space-y-4 text-xs">
              {/* Hot segment */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-emerald-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                    <span>Hot Lead</span>
                  </span>
                  <span className="font-mono text-muted-foreground">80 - 100 pts</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[85%]" />
                </div>
                <p className="text-[10px] text-muted-foreground">Matches all 3 target logic rules. Instant sales routing triggered.</p>
              </div>

              {/* Warm segment */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-amber-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-500" />
                    <span>Warm Lead</span>
                  </span>
                  <span className="font-mono text-muted-foreground">50 - 79 pts</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[60%]" />
                </div>
                <p className="text-[10px] text-muted-foreground">Matches 1 or 2 rules. Nurturing follow-ups scheduled.</p>
              </div>

              {/* Cold segment */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-red-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-red-500" />
                    <span>Cold Lead</span>
                  </span>
                  <span className="font-mono text-muted-foreground">0 - 49 pts</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[30%]" />
                </div>
                <p className="text-[10px] text-muted-foreground">Matches no target criteria. Leads stored for bulk newsletters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Question Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full relative animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Add Screening Question</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Define a pre-qualification question for the AI screening bot.</p>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Question Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-muted border border-border rounded px-2.5 py-1.5 text-xs text-muted-foreground"
                >
                  <option value="Short Text">Short Text</option>
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Dropdown">Dropdown</option>
                  <option value="Yes/No">Yes/No</option>
                  <option value="Number">Number</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Question Prompt Text</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. What is your estimated annual budget?"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {['Multiple Choice', 'Dropdown'].includes(newType) && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Options (Comma separated)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Option A, Option B, Option C"
                    value={newOptionsText}
                    onChange={(e) => setNewOptionsText(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newText.trim()}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
