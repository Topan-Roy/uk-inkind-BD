"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ChevronRight,
  BarChart2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  RefreshCcw,
  BookOpen,
  Activity,
  Award,
  ArrowRight,
  User,
  Layout,
  TrendingDown,
  ChevronDown
} from "lucide-react";

// --- Constants & Mock Data ---

const CLIENT_BEHAVIORS = [
  "Avoiding social situations",
  "Checking doors repeatedly",
  "Procrastinating on important tasks",
  "Avoiding conflict conversations",
  "Excessive reassurance seeking"
];

const INITIAL_HIERARCHY = [
  { step: "Say hello to a cashier at the shop", originalSuds: 3, currentSuds: null, status: 'not-started', attempts: 0, mastered: false },
  { step: "Make small talk with a colleague at the coffee machine", originalSuds: 5, currentSuds: null, status: 'not-started', attempts: 0, mastered: false },
  { step: "Attend a small team meeting and contribute one comment", originalSuds: 7, currentSuds: null, status: 'not-started', attempts: 0, mastered: false },
  { step: "Join a social lunch with colleagues", originalSuds: 8, currentSuds: null, status: 'not-started', attempts: 0, mastered: false },
  { step: "Attend a networking event for 30 minutes", originalSuds: 10, currentSuds: null, status: 'not-started', attempts: 0, mastered: false }
];

// --- Components ---

const MessageBubble = ({ msg, isBot }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`flex ${isBot ? "justify-start" : "justify-end"} mb-6 w-full`}
  >
    <div
      className={`max-w-[85%] p-4 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border transition-all duration-300 ${isBot
        ? "bg-white border-stone-100 text-stone-700 rounded-bl-none"
        : "bg-stone-900 border-stone-800 text-white rounded-br-none"
        }`}
    >
      <div className="text-[14px] leading-relaxed font-light whitespace-pre-line">
        {msg.content}
      </div>
      {msg.timestamp && (
        <div className={`text-[8px] mt-2 opacity-30 uppercase tracking-[0.1em] font-bold ${isBot ? "text-stone-500" : "text-stone-100"}`}>
          {msg.timestamp}
        </div>
      )}
    </div>
  </motion.div>
);

const OptionButton = ({ label, onClick, selected, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`group relative w-full p-4 mb-2 text-left rounded-xl border transition-all duration-300 transform active:scale-[0.98] ${selected
      ? "bg-stone-900 border-stone-900 text-white shadow-md font-bold"
      : "bg-white border-stone-100 text-stone-600 hover:border-stone-200 hover:bg-stone-50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <div className="flex items-center justify-between pointer-events-none">
      <span className="text-xs pr-8">{label}</span>
      <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ${selected ? "text-white" : "text-stone-300"}`} />
    </div>
  </button>
);

// --- Main Page Component ---

export default function BehavioursPage() {
  const [activeTab, setActiveTab] = useState("planning");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sessionAvailable, setSessionAvailable] = useState(false); // Simulated "7 days" logic

  // Unified state for both flows
  const [flowState, setFlowState] = useState({
    // Planning
    step: "welcome",
    selectedBehavior: null,
    hierarchy: [], // { step, suds }
    // Review
    reviewingStepIndex: null,
    reviewHierarchy: INITIAL_HIERARCHY, // { step, originalSuds, currentSuds, status, attempts, mastered, plannedDay }
    reviewStepProgress: [], // indices of steps already reviewed
    initialReviewChoice: null,
    completedReviewCount: 0,
    attemptedReviewCount: 0,
  });

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Reset and start flow based on tab
    if (activeTab === "planning") {
      startPlanningFlow();
    } else {
      startReviewFlow();
    }
  }, [activeTab]);

  const addBotMessage = (content, delay = 800) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            content,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        resolve();
      }, delay);
    });
  };

  const addUserMessage = (content) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        content,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // --- PLANNING FLOW (CODE 1) ---

  const startPlanningFlow = async () => {
    setMessages([]);
    setFlowState(prev => ({ ...prev, step: "welcome", hierarchy: [], selectedBehavior: null }));

    await addBotMessage("Welcome. I'm here to support you with the behavioral aspects of your therapy as part of your weekly homework plan.");
    await addBotMessage("Working on behaviors that maintain or exacerbate your difficulties can be an important part of your recovery journey. This is entirely optional, and we'll proceed at a pace that feels comfortable for you.", 2000);
    await addBotMessage("Based on your CBT formulation, you've identified several behaviors that may be contributing to your current difficulties. Let's explore which one you'd like to address this week:", 2000);

    setFlowState(prev => ({ ...prev, step: "select_behavior" }));
  };

  const handleSelectBehavior = async (behavior) => {
    addUserMessage(behavior);
    setFlowState(prev => ({ ...prev, selectedBehavior: behavior, step: "transitioning" }));

    await addBotMessage(`That's a thoughtful choice. Working on "${behavior}" can lead to meaningful change. Together, we'll create a gradual exposure hierarchy that feels manageable and achievable.`);
    await addBotMessage("We'll break this down into small, manageable steps. Starting with situations that cause minimal distress and gradually working towards more challenging ones. This approach ensures you build confidence at each stage.", 2000);

    const prompt = getHierarchyPrompt(behavior);
    await addBotMessage(prompt, 2000);

    setFlowState(prev => ({ ...prev, step: "collecting_step_desc" }));
  };

  const getHierarchyPrompt = (behavior) => {
    if (behavior === "Avoiding social situations") return "Let's begin gently. Can you describe a social situation that would cause you minimal anxiety? Perhaps something around 2-3 out of 10 on the distress scale?";
    if (behavior === "Checking doors repeatedly") return "What would be a small first step in reducing your checking behavior? For instance, might checking just once before bed feel manageable?";
    if (behavior === "Procrastinating on important tasks") return "What's the smallest step you could take towards an important task? Perhaps spending just 5 minutes on it, or simply organizing your materials?";
    if (behavior === "Avoiding conflict conversations") return "Could we start with something very mild? Perhaps expressing a small preference or disagreement about something minor?";
    return `For "${behavior}", what would be the smallest, most gentle first step you could imagine taking?`;
  };

  const processPlanningInput = async (val) => {
    if (flowState.step === "collecting_step_desc") {
      setFlowState(prev => ({
        ...prev,
        hierarchy: [...prev.hierarchy, { step: val, suds: null }],
        step: "collecting_suds"
      }));
      await addBotMessage("Thank you for sharing that. To help us understand the challenge level, could you rate how much distress this would cause on a scale from 0 to 10? (0 being no distress at all, 10 being maximum distress)");
    } else if (flowState.step === "collecting_suds") {
      const suds = parseInt(val);
      if (isNaN(suds) || suds < 0 || suds > 10) {
        await addBotMessage("Please enter a number between 0 and 10.");
        return;
      }

      const newHierarchy = [...flowState.hierarchy];
      newHierarchy[newHierarchy.length - 1].suds = suds;

      if (newHierarchy.length < 5) {
        const currentRatings = newHierarchy.map(h => h.suds).filter(s => s !== null);
        const maxSuds = Math.max(...currentRatings);
        const stepsLeft = 5 - newHierarchy.length;

        let nextSuds;
        let nextMsg;

        if (newHierarchy.length === 4) {
          nextSuds = "8-10";
          nextMsg = `That's helpful - a ${suds}/10. For our final step, let's consider your most challenging scenario. What situation would represent the biggest step, perhaps around ${nextSuds}/10?`;
        } else {
          if (maxSuds >= 9) {
            nextSuds = "intermediate level";
            nextMsg = `Thank you - that's a ${suds}/10. Now let's fill in our hierarchy. Can you think of a step that would be at an intermediate level in terms of distress?`;
          } else {
            const increment = Math.ceil((10 - maxSuds) / stepsLeft);
            nextSuds = Math.min(maxSuds + increment, 10);
            nextMsg = `Good - that's a ${suds}/10. Let's gradually increase the challenge. What would be a step that might cause around ${nextSuds}/10 distress?`;
          }
        }

        setFlowState(prev => ({ ...prev, hierarchy: newHierarchy, step: "collecting_step_desc" }));
        await addBotMessage(nextMsg);
      } else {
        setFlowState(prev => ({ ...prev, hierarchy: newHierarchy, step: "complete" }));
        await completePlanning(newHierarchy);
      }
    }
  };

  const completePlanning = async (hierarchy) => {
    await addBotMessage("Excellent work. Here's your personalised exposure hierarchy:");
    const sorted = [...hierarchy].sort((a, b) => a.suds - b.suds);

    await addBotMessage(
      <div className="w-full space-y-4">
        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Your Weekly Plan</div>
        <div className="space-y-2">
          {sorted.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-[10px] font-bold text-stone-300 shrink-0">STEP {idx + 1}</span>
              <span className="text-sm text-stone-700 flex-1">{item.step}</span>
              <span className="bg-stone-900 text-white text-[9px] px-2 py-0.5 rounded font-bold shrink-0">SUDS {item.suds}/10</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-stone-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-black text-stone-300 uppercase">Week 1 Progress</span>
            <span className="text-[9px] font-black text-stone-900">20%</span>
          </div>
          <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} className="h-full bg-stone-900" />
          </div>
        </div>
        <div className="p-3 bg-stone-50 rounded-xl border-l-[3px] border-stone-900 text-[12px] text-stone-500 leading-relaxed font-light italic">
          <strong>This Week's Focus:</strong> Begin with Step 1. Practice it daily when possible, and observe how your distress level naturally decreases with repetition.
        </div>
      </div>
    );

    await addBotMessage("Remember, you're in control of this process. If any step feels too challenging, we can adjust it in your next session. Your wellbeing and comfort are our priority.", 2500);
  };

  // --- REVIEW FLOW (CODE 2) ---

  const startReviewFlow = async () => {
    setMessages([]);
    setFlowState(prev => ({
      ...prev,
      step: "review_welcome",
      reviewStepProgress: [],
      initialReviewChoice: null,
      reviewingStepIndex: null
    }));

    await addBotMessage("Welcome back. I hope you've had a chance to begin working with your exposure hierarchy for 'Avoiding social situations'.");
    await addBotMessage("Remember: successful exposure therapy isn't about rushing through steps. It's about repeating each step until your anxiety naturally decreases. Most people need 5-10 repetitions of the same exposure before their SUDS drops significantly.", 2000);
    await addBotMessage("How have you been finding the homework this week?", 2000);

    setFlowState(prev => ({ ...prev, step: "review_initial_choice" }));
  };

  const handleReviewInitialChoice = async (choice) => {
    const labels = {
      good: "I've made some progress",
      challenging: "It's been challenging",
      mixed: "Mixed - some good, some difficult",
      unable: "I wasn't able to practice"
    };

    addUserMessage(labels[choice]);

    let botResp = "";
    switch (choice) {
      case 'good': botResp = "That's wonderful to hear. Every step forward, no matter how small, is meaningful progress. Let's look at what you've accomplished."; break;
      case 'challenging': botResp = "Thank you for your honesty. Exposure work can be difficult, and acknowledging the challenge is important. Let's explore what's been happening."; break;
      case 'mixed': botResp = "That's very normal and expected. Exposure therapy often has ups and downs. Let's review both the successes and the challenges."; break;
      case 'unable': botResp = "That's completely okay. Sometimes life gets in the way, or we're not ready yet. There's no judgment here. Let's talk about what happened and how we can adjust."; break;
    }

    setFlowState(prev => ({ ...prev, initialReviewChoice: choice, step: "transitioning_review" }));
    await addBotMessage(botResp);
    await addBotMessage("Let's review each step from your hierarchy. We'll go through them one by one, and you can tell me about your experience with each.", 2000);

    showReviewListCard();
  };

  const showReviewListCard = () => {
    addBotMessage(
      <div className="w-full space-y-4">
        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Your Exposure Hierarchy - Week 1</div>
        <div className="space-y-3">
          {flowState.reviewHierarchy.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectStepToReview(idx)}
              className={`p-3 bg-white border rounded-xl cursor-pointer transition-all hover:bg-stone-50 ${item.status === 'completed' ? "border-l-[4px] border-l-green-500" :
                  item.status === 'in-progress' ? "border-l-[4px] border-l-amber-500" :
                    "border-l-[4px] border-l-stone-200"
                }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black text-stone-300 uppercase">Step {idx + 1}</span>
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${item.status === 'completed' ? "bg-green-100 text-green-700" :
                    item.status === 'in-progress' ? "bg-amber-100 text-amber-700" :
                      "bg-stone-100 text-stone-400"
                  }`}>{item.status.replace('-', ' ')}</span>
              </div>
              <p className="text-sm font-medium text-stone-700 mb-2">{item.step}</p>
              <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold border-t border-stone-50 pt-2">
                <span>Original: {item.originalSuds}/10</span>
                {item.currentSuds !== null && <span>→ Current: <b className="text-stone-900">{item.currentSuds}/10</b></span>}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-stone-300 text-center font-bold tracking-tight">Tap any step to update your progress</p>
      </div>
    );
  };

  const handleSelectStepToReview = async (idx) => {
    const step = flowState.reviewHierarchy[idx];
    setFlowState(prev => ({ ...prev, reviewingStepIndex: idx, step: "review_step_practice" }));
    await addBotMessage(`Let's talk about Step ${idx + 1}: "${step.step}". Did you have a chance to practice this step this week?`);
  };

  const handleUpdateStepStatus = async (status) => {
    const labels = { 'completed': "Yes, I practiced it", 'in-progress': "I tried but couldn't complete it", 'not-started': "I haven't tried this yet" };
    addUserMessage(labels[status]);

    const newHierarchy = [...flowState.reviewHierarchy];
    newHierarchy[flowState.reviewingStepIndex].status = status;
    setFlowState(prev => ({ ...prev, reviewHierarchy: newHierarchy, step: 'processing_status' }));

    if (status === 'completed' || status === 'in-progress') {
      await addBotMessage("How would you rate your distress level when you attempted this step? (0 = no distress, 10 = maximum distress)");
      setFlowState(prev => ({ ...prev, step: "review_rating_suds" }));
    } else {
      await addBotMessage("That's perfectly fine. Let's make a plan for you to try this step in the coming week.");
      await addBotMessage("What day next week would work best for you to attempt this step?", 1500);
      setFlowState(prev => ({ ...prev, step: "review_select_day" }));
    }
  };

  const handleSelectSudsRating = async (rating) => {
    addUserMessage(`${rating}/10`);
    const idx = flowState.reviewingStepIndex;
    const newHierarchy = [...flowState.reviewHierarchy];
    newHierarchy[idx].currentSuds = rating;
    newHierarchy[idx].attempts += 1;

    const imp = newHierarchy[idx].originalSuds - rating;
    let resp = "";
    if (imp > 0) resp = `Good work! Your distress has decreased from ${newHierarchy[idx].originalSuds}/10 to ${rating}/10. This ${imp}-point reduction shows the exposure is working.`;
    else if (imp === 0) resp = `Your distress level remains at ${rating}/10. This is completely normal - it often takes 5-10 repetitions before you see a decrease.`;
    else resp = `I notice your distress was ${rating}/10, which is higher than the original ${newHierarchy[idx].originalSuds}/10. This can happen when we're having a difficult day.`;

    setFlowState(prev => ({ ...prev, reviewHierarchy: newHierarchy, step: "processing_rating" }));
    await addBotMessage(resp);

    if (rating <= 2) {
      newHierarchy[idx].mastered = true;
      setFlowState(prev => ({ ...prev, reviewHierarchy: newHierarchy }));
      await addBotMessage(`✅ Excellent! With your SUDS at ${rating}/10, you've mastered this step. This is a significant achievement!`);
      await addBotMessage("You're ready to progress! Would you like to review another step from your hierarchy?", 1500);
      setFlowState(prev => ({ ...prev, step: "review_next_action" }));
    } else {
      await addBotMessage(`This step still causes significant distress (${rating}/10). This is perfectly normal - some steps take longer to master. Let's problem-solve together.`);
      await addBotMessage(`To help reduce your SUDS for "${newHierarchy[idx].step}", what was the hardest part about it?`, 1500);
      setFlowState(prev => ({ ...prev, step: "review_problem_solving" }));
    }
  };

  const handleProblemChoice = async (type) => {
    const labels = { anticipation: "The anticipation beforehand", during: "The moment during the exposure", physical: "Physical anxiety symptoms", thoughts: "Negative thoughts/predictions", other: "Something else" };
    addUserMessage(labels[type]);

    let advice = "";
    switch (type) {
      case 'anticipation': advice = "Schedule exposure for morning (less time to worry), use the '5-minute rule', and remind yourself: anticipation is often worse than reality."; break;
      case 'during': advice = "Start with even shorter duration (30 seconds), use calm breathing, and rate your SUDS every 30 seconds - watch it drop."; break;
      case 'physical': advice = "Practice box breathing before & during, normalize symptoms: 'This is just adrenaline', and do gentle exercise before exposure."; break;
      case 'thoughts': advice = "Write down predictions vs. what actually happened, use coping statements: 'I can handle this', and focus on facts, not feelings."; break;
      default: advice = "Make the step 25% easier temporarily, practice at your best time of day, and reward yourself after each attempt."; break;
    }

    await addBotMessage(
      <div className="p-4 bg-blue-50 border-l-[4px] border-blue-500 rounded-xl space-y-2">
        <div className="text-[11px] font-bold text-blue-900 uppercase">Strategy for {labels[type]}</div>
        <p className="text-sm text-blue-700 leading-relaxed">{advice}</p>
        <div className="pt-2 text-[11px] font-bold text-blue-900">Next week: Practice this same step daily using these strategies.</div>
      </div>
    );

    await addBotMessage("Would you like to review another step or finish your weekly summary?", 2000);
    setFlowState(prev => ({ ...prev, step: "review_next_action" }));
  };

  const handleSelectDay = async (day) => {
    addUserMessage(day);
    const newHierarchy = [...flowState.reviewHierarchy];
    newHierarchy[flowState.reviewingStepIndex].plannedDay = day;

    setFlowState(prev => ({ ...prev, reviewHierarchy: newHierarchy, step: 'processing_day' }));
    await addBotMessage(`Perfect. I've scheduled "${newHierarchy[flowState.reviewingStepIndex].step}" for ${day} next week.`);
    await addBotMessage("Would you like to review another step or finish your weekly summary?", 1500);
    setFlowState(prev => ({ ...prev, step: "review_next_action" }));
  };

  const finishReviewFlow = async () => {
    const h = flowState.reviewHierarchy;
    const completed = h.filter(s => s.status === 'completed').length;
    const attempted = h.filter(s => s.status !== 'not-started').length;
    const improvements = h.filter(s => s.currentSuds !== null).map(s => s.originalSuds - s.currentSuds);
    const avgImp = improvements.length > 0 ? (improvements.reduce((a, b) => a + b, 0) / improvements.length).toFixed(1) : "N/A";

    await addBotMessage("Excellent work finishing your review. Here's your weekly summary:");

    await addBotMessage(
      <div className="w-full space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-2xl border border-stone-100 text-center shadow-sm">
            <div className="text-xl font-bold text-stone-900">{completed}</div>
            <div className="text-[8px] font-black text-stone-300 uppercase">Completed</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-stone-100 text-center shadow-sm">
            <div className="text-xl font-bold text-stone-900">{attempted}</div>
            <div className="text-[8px] font-black text-stone-300 uppercase">Attempted</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-stone-100 text-center shadow-sm">
            <div className="text-xl font-bold text-stone-900">{avgImp}</div>
            <div className="text-[8px] font-black text-stone-300 uppercase">Avg Reduction</div>
          </div>
        </div>

        <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-xl">
          <p className="text-sm font-light leading-relaxed">
            {completed >= 3 ? "Outstanding work this week! You've shown remarkable courage in facing multiple exposure challenges." :
              completed >= 1 ? "Well done on completing exposure steps this week. Each success builds your confidence." :
                "You've shown courage by attempting exposure work. Even attempts that feel incomplete are valuable learning experiences."}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-stone-100">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Recommended Plan for Week 2</div>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-3">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-900 font-bold border border-stone-200">1</div>
              <div className="flex-1 text-[13px] text-stone-700 font-medium">Focus all your effort on mastering your current step this week. Quality over quantity!</div>
            </div>
            <div className="flex gap-4 border-t border-stone-200/50 pt-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-900 font-bold border border-stone-200">2</div>
              <div className="flex-1 text-[13px] text-stone-700 font-medium whitespace-pre-line">
                {"Monday & Thursday: Foundation Days\nTuesday & Friday: Repetition Days"}
              </div>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-red-900 text-[12px] leading-relaxed">
            <strong>CRITICAL RULE:</strong> Each step MUST reach SUDS 0-2 before progressing to the next challenge. Rushing ahead will make future steps harder.
          </div>
        </div>
      </div>
    );

    await addBotMessage("You're making excellent progress! Keep up the consistent practice. See you next week!", 2500);
    setFlowState(prev => ({ ...prev, step: "finished" }));
  };

  // --- UI HANDLERS ---

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const val = inputValue.trim();
    addUserMessage(val);
    setInputValue("");

    if (activeTab === "planning") {
      processPlanningInput(val);
    } else {
      // In review flow, we mostly use buttons, but free text can be for reflections
      addBotMessage("Thank you for sharing your reflection. I've noted this for your session summary.");
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 font-sans">

      {/* Dynamic Tab Switcher */}
      <div className="flex items-center justify-between px-2">
        <div className="flex bg-white/40 backdrop-blur-xl p-1 rounded-[18px] border border-stone-200/50 shadow-sm relative z-10">
          <button
            onClick={() => setActiveTab("planning")}
            className={`px-8 py-2.5 rounded-[14px] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === "planning" ? "bg-stone-900 text-white shadow-xl scale-105" : "text-stone-400 hover:text-stone-600"
              }`}
          >
            Planning
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-8 py-2.5 rounded-[14px] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group ${activeTab === "review" ? "bg-stone-900 text-white shadow-xl scale-105" : "text-stone-400 hover:text-stone-600"
              }`}
          >
            Review
            {!sessionAvailable && activeTab === "planning" && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
        </div>

       
      </div>

      {/* Main Experience Container */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 relative">

        {/* Chat Window */}
        <section className="flex-1 bg-white/40 backdrop-blur-[md] rounded-[40px] border border-white/60 shadow-[0_30px_100px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden relative group">

          <div className="flex-1 overflow-y-auto px-10 py-12 space-y-2 scrollbar-hide">
            <AnimatePresence mode="popLayout" initial={false}>
              {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} isBot={msg.sender === "bot"} />)}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-8">
                  <div className="bg-white/80 p-5 rounded-3xl rounded-bl-none border border-stone-100 flex gap-2 shadow-sm">
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-stone-300 rounded-full" />
                  </div>
                </motion.div>
              )}

              {/* INTERACTIVE CONTROLS */}

              {/* Planning: Select Behavior */}
              {activeTab === 'planning' && flowState.step === 'select_behavior' && !isTyping && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[400px] pb-10">
                  {CLIENT_BEHAVIORS.map(b => (
                    <OptionButton key={b} label={b} onClick={() => handleSelectBehavior(b)} />
                  ))}
                </motion.div>
              )}

              {/* Review: Initial Choice */}
              {activeTab === 'review' && flowState.step === 'review_initial_choice' && !isTyping && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[400px] pb-10">
                  <OptionButton label="I've made some progress" onClick={() => handleReviewInitialChoice('good')} />
                  <OptionButton label="It's been challenging" onClick={() => handleReviewInitialChoice('challenging')} />
                  <OptionButton label="Mixed results" onClick={() => handleReviewInitialChoice('mixed')} />
                  <OptionButton label="I wasn't able to practice" onClick={() => handleReviewInitialChoice('unable')} />
                </motion.div>
              )}

              {/* Review: Step Options */}
              {activeTab === 'review' && flowState.step === 'review_step_practice' && !isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[400px] pb-10">
                  <OptionButton label="Yes, I practiced it" onClick={() => handleUpdateStepStatus('completed')} />
                  <OptionButton label="I tried but couldn't complete it" onClick={() => handleUpdateStepStatus('in-progress')} />
                  <OptionButton label="I haven't tried this yet" onClick={() => handleUpdateStepStatus('not-started')} />
                </motion.div>
              )}

              {/* Review: SUDS Scale */}
              {activeTab === 'review' && flowState.step === 'review_rating_suds' && !isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2 max-w-[400px] pb-10">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button
                      key={n}
                      onClick={() => handleSelectSudsRating(n)}
                      className="w-10 h-10 rounded-xl bg-white border border-stone-100 flex items-center justify-center text-xs font-bold hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                    >
                      {n}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Review: Problem Solving */}
              {activeTab === 'review' && flowState.step === 'review_problem_solving' && !isTyping && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[400px] pb-10">
                  <OptionButton label="The anticipation beforehand" onClick={() => handleProblemChoice('anticipation')} />
                  <OptionButton label="The moment during exposure" onClick={() => handleProblemChoice('during')} />
                  <OptionButton label="Physical symptoms" onClick={() => handleProblemChoice('physical')} />
                  <OptionButton label="Negative thoughts/predictions" onClick={() => handleProblemChoice('thoughts')} />
                  <OptionButton label="Something else" onClick={() => handleProblemChoice('other')} />
                </motion.div>
              )}

              {/* Review: Select Day */}
              {activeTab === 'review' && flowState.step === 'review_select_day' && !isTyping && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[400px] pb-10">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend', 'Multiple days'].map(d => (
                    <OptionButton key={d} label={d} onClick={() => handleSelectDay(d)} />
                  ))}
                </motion.div>
              )}

              {/* Review: What Next? */}
              {activeTab === 'review' && flowState.step === 'review_next_action' && !isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[400px] pb-10">
                  <OptionButton label="Review another step from hierarchy" onClick={() => { startReviewFlow(); /* essentially re-triggers the list showing */ }} />
                  <OptionButton label="Finish and see weekly summary" onClick={finishReviewFlow} />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          <footer className="px-8 py-8 bg-white border-t border-stone-100 relative z-20 transition-all focus-within:bg-stone-50/50">
            <div className=" flex items-center gap-4">
              <div className="flex-1 bg-stone-50 rounded-[28px] border border-stone-100  flex items-center focus-within:ring-4 focus-within:ring-stone-900/5 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isTyping}
                  placeholder={
                    flowState.step === 'collecting_suds' ? "Enter SUDS rating (0-10)..." :
                      flowState.step === 'collecting_step_desc' ? "Describe the exposure step..." :
                        "Type a message or reflection..."
                  }
                  className="flex-1 bg-transparent px-6 py-4 outline-none text-[15px] font-medium text-stone-700 placeholder:text-stone-300 placeholder:font-light"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 bg-stone-900 text-white rounded-[22px] flex items-center justify-center shadow-2xl shadow-stone-900/20 transition-all active:scale-95 disabled:opacity-20 shrink-0"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            <p className="mt-4 text-[10px] font-black text-stone-200 uppercase tracking-widest text-center flex items-center justify-center gap-2">
              Safe Clinical Session <Activity size={10} className="animate-pulse text-green-500" /> End-to-End Encrypted
            </p>
          </footer>
        </section>

        {/* Floating Background Accent */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-stone-100 rounded-full blur-[100px] -z-10 opacity-60" />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Outfit', sans-serif;
          background-color: #FDFDFD;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        input::placeholder {
           font-style: italic;
           letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
