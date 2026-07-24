'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Cpu, 
  Check, 
  FileText, 
  Globe, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type ConnectType = 'app' | 'api' | null;

export default function ConnectWhatsApp() {
  const router = useRouter();
  const [connectType, setConnectType] = useState<ConnectType>(null);
  const [step, setStep] = useState<number>(0); // 0 = Selection, 1-5 = Wizard steps

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [businessCountry, setBusinessCountry] = useState('United States');
  const [metaVerified, setMetaVerified] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'gst' | 'website'>('gst');
  const [gstFile, setGstFile] = useState<File | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  // Simulated loading states
  const [isValidatingOtp, setIsValidatingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startWizard = (type: ConnectType) => {
    setConnectType(type);
    setStep(1);
  };

  const handleBack = () => {
    if (step === 1) {
      setStep(0);
      setConnectType(null);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextStep = () => {
    if (step === 3) {
      // Trigger OTP validation mock loader
      setIsValidatingOtp(true);
      setTimeout(() => {
        setIsValidatingOtp(false);
        setStep(4);
      }, 1500);
    } else if (step === 4) {
      // Finalize setup mock loader
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(5);
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGstFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Navigation Breadcrumb */}
      {step > 0 && (
        <button 
          onClick={handleBack} 
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      )}

      {/* STEP 0: Connection Method Selection */}
      {step === 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Connect WhatsApp Business</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select the onboarding channel that matches your business model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPTION 1: WhatsApp Business App */}
            <div className="border border-border bg-card rounded-xl p-5 flex flex-col justify-between space-y-5 hover:border-primary/30 transition-all shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">Connect Existing WhatsApp App</h3>
                    <span className="text-[10px] text-muted-foreground">Continue using your current workflow</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use your existing WhatsApp Business number without changing your workflow. Perfect for small businesses.
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Requirements:</span>
                  <ul className="text-[11px] text-muted-foreground space-y-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      <span>Existing WhatsApp Business App number</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      <span>GST Certificate OR Verified Website</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      <span>Meta Verification</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Features:</span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-foreground font-semibold">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Messages Sync</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Existing Chats</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> AI Qualification</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Chatbot Supported</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-red-500">
                  <span className="font-bold uppercase text-[9px] tracking-wider block">Limitations:</span>
                  <p>• Slower broadcast speed (~10 msgs/min)</p>
                  <p>• Catalog managed inside WhatsApp App</p>
                  <p>• Calls handled through WhatsApp only</p>
                </div>
              </div>

              <button 
                onClick={() => startWizard('app')}
                className="w-full py-2 bg-secondary text-foreground hover:bg-secondary/75 font-semibold text-xs rounded-lg transition-colors border border-border flex items-center justify-center gap-1.5"
              >
                <span>Connect Existing Number</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* OPTION 2: New API Number */}
            <div className="border border-border bg-card rounded-xl p-5 flex flex-col justify-between space-y-5 hover:border-primary/30 transition-all shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">New API Number</h3>
                    <span className="text-[10px] text-muted-foreground">Dedicated WhatsApp Business API Number</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use a fresh, clean number dedicated specifically for CRM automation and business scaling.
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Requirements:</span>
                  <ul className="text-[11px] text-muted-foreground space-y-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      <span>Fresh phone number (no existing WhatsApp accounts)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      <span>OTP Verification</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      <span>GST OR Website Verification</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Features:</span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-foreground font-semibold">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Fast Broadcasts</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> API First</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Catalog Mgmt</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Call Analytics</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-amber-500/90 font-medium">
                  <span className="font-bold uppercase text-[9px] tracking-wider block">Limitations:</span>
                  <p>• Cannot use standard WhatsApp App</p>
                  <p>• Group chat features unavailable</p>
                  <p>• WhatsApp Status feature unavailable</p>
                </div>
              </div>

              <button 
                onClick={() => startWizard('api')}
                className="w-full py-2 bg-primary text-black font-semibold text-xs rounded-lg hover:bg-primary/95 transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10"
              >
                <span>Connect New Number</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WIZARD INTERFACE */}
      {step > 0 && step < 5 && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6">
          {/* Stepper Header */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="text-xs font-bold text-foreground">
              Connecting {connectType === 'app' ? 'Existing App' : 'Cloud API'} Number
            </span>
            <span className="text-[10px] text-muted-foreground font-mono font-bold">
              Step {step} of 4
            </span>
          </div>

          {/* Stepper Progress bar */}
          <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* STEP 1: Business Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Step 1: Business Details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Please provide registered Meta business info.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Registered Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp Inc."
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Business Country</label>
                  <select
                    value={businessCountry}
                    onChange={(e) => setBusinessCountry(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="metaVerify"
                    checked={metaVerified}
                    onChange={(e) => setMetaVerified(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-muted"
                  />
                  <label htmlFor="metaVerify" className="text-xs font-semibold text-foreground">
                    This business is already Meta Verified
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  disabled={!businessName.trim()}
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Business Verification */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Step 2: Business Verification</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Submit legal documents or verify your website to comply with Meta Policies.</p>
              </div>

              <div className="flex border border-border rounded-lg overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setVerificationMethod('gst')}
                  className={`flex-1 py-2 font-bold text-center border-r border-border transition-colors ${
                    verificationMethod === 'gst' ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-secondary/40'
                  }`}
                >
                  GST Certificate Verification
                </button>
                <button
                  type="button"
                  onClick={() => setVerificationMethod('website')}
                  className={`flex-1 py-2 font-bold text-center transition-colors ${
                    verificationMethod === 'website' ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-secondary/40'
                  }`}
                >
                  Website Link Verification
                </button>
              </div>

              {verificationMethod === 'gst' ? (
                <div className="border border-dashed border-border rounded-xl p-6 text-center space-y-3">
                  <div className="flex justify-center">
                    <FileText className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-foreground block">Upload Business Document (GST)</span>
                    <span className="text-[10px] text-muted-foreground block">Supports PDF, JPG, or PNG up to 5MB</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <label className="cursor-pointer bg-secondary hover:bg-secondary/80 text-foreground border border-border px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{gstFile ? gstFile.name : 'Choose File'}</span>
                      <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-500/90 font-medium">
                    <Info className="w-3.5 h-3.5" />
                    <span>Estimated approval time: 4 to 24 hours</span>
                  </div>
                </div>
              ) : (
                <div className="border border-border bg-card rounded-xl p-5 space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Company Website URL</label>
                    <div className="flex gap-2">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground shrink-0 flex items-center">
                        https://
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="www.yourcompany.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="bg-secondary/40 border border-border p-3.5 rounded-lg text-xs space-y-2">
                    <span className="font-bold text-foreground block">Verification Guide:</span>
                    <ol className="text-[10px] text-muted-foreground list-decimal list-inside space-y-1">
                      <li>Ensure your website features matching legal business name.</li>
                      <li>Include an SSL certificate (https).</li>
                      <li>We will verify domains using standard webhooks or Meta DNS record links.</li>
                    </ol>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-primary font-medium">
                    <Info className="w-3.5 h-3.5" />
                    <span>Estimated approval time: 10 to 30 minutes</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  Skip for now
                </button>
                <button
                  type="button"
                  disabled={verificationMethod === 'gst' ? !gstFile : !websiteUrl.trim()}
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Phone Verification */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Step 3: Phone Number Verification</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {connectType === 'api' 
                    ? 'Enter a fresh number (not registered with any WhatsApp app).'
                    : 'Enter your current WhatsApp Business number.'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Phone Number (with Country Code)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                {phoneNumber.trim().length > 6 && (
                  <div className="border border-border p-4 rounded-xl bg-secondary/10 space-y-3">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-muted-foreground block">Simulated OTP Screen</span>
                    <p className="text-xs text-muted-foreground">An OTP code has been dispatched. Enter the mock 6-digit code: <span className="font-bold text-primary font-mono">123456</span></p>
                    <div>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP..."
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-40 text-center tracking-[0.5em] bg-muted border border-border rounded-lg px-3 py-2 text-sm font-bold font-mono text-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  disabled={!phoneNumber.trim() || otpCode !== '123456' || isValidatingOtp}
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5 animate-pulse"
                >
                  {isValidatingOtp ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify Code</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Step 4: Review Connection Details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Please confirm details before dispatching activation requests to Meta.</p>
              </div>

              <div className="border border-border rounded-xl bg-secondary/5 divide-y divide-border text-xs">
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Connection Type</span>
                  <span className="font-bold text-foreground">{connectType === 'app' ? 'Existing App' : 'Dedicated Cloud API'}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Business Name</span>
                  <span className="font-bold text-foreground">{businessName}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-bold text-foreground">{businessCountry}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Verification Method</span>
                  <span className="font-bold text-foreground">
                    {verificationMethod === 'gst' ? `GST Certificate (${gstFile?.name || 'File'})` : `Website (${websiteUrl})`}
                  </span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span className="font-bold text-foreground font-mono">{phoneNumber}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-muted-foreground">Meta Verification status</span>
                  <span className="font-semibold text-primary">{metaVerified ? 'Verified' : 'Pending verification review'}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleNextStep}
                  className="px-5 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting details...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 text-foreground" />
                      <span>Submit & Connect</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: Connected Successfully */}
      {step === 5 && (
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center space-y-6 max-w-md mx-auto">
          <div className="flex justify-center">
            <div className="bg-emerald-500/10 p-3.5 rounded-full text-emerald-500 ring-8 ring-emerald-500/5">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">WhatsApp Connected Successfully!</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your business number <span className="font-mono font-bold text-foreground">{phoneNumber}</span> is now linked with your Green Pilot CRM workspace.
            </p>
          </div>

          <div className="border border-border rounded-lg bg-secondary/5 p-4 text-xs text-left space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">Status: Active</span>
            </div>
            <p className="text-muted-foreground text-[10px]">
              AI Lead screening triggers are active. The Meta webhook listener will stream incoming client conversations automatically.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => router.replace('/whatsapp/overview')}
              className="w-full py-2 bg-primary text-black font-semibold text-xs rounded-lg hover:bg-primary/95 transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10"
            >
              <span>Go to Overview Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => router.replace('/whatsapp/inbox')}
              className="w-full py-2 bg-secondary text-foreground hover:bg-secondary/75 font-semibold text-xs rounded-lg transition-colors border border-border"
            >
              Open Inbox CRM
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
