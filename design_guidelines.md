# Design Guidelines: Mental Health Journal App

## Design Approach

**Selected Approach:** Reference-Based (Calm + Headspace + Reflectly blend)

**Justification:** Mental wellness app requiring emotional safety, calming aesthetics, and trust-building through consistent, supportive design. Drawing from Calm's serene minimalism, Headspace's playful warmth, and Reflectly's journaling focus.

**Key Design Principles:**
- Safe & Calming: Gentle colors and generous spacing reduce anxiety
- Clarity First: No visual clutter that could overwhelm
- Supportive Presence: Encouraging without being intrusive
- Data as Insight: Analytics feel empowering, not judgmental

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 210 25% 98% (Soft blue-gray background)
- Surface: 0 0% 100% (Pure white cards)
- Accent: 160 40% 65% (Calming sage green - growth & healing)
- Secondary Accent: 250 35% 70% (Soft lavender - calm & introspection)
- Text Primary: 210 15% 20% (Deep blue-gray)
- Text Secondary: 210 10% 50% (Medium gray)
- Success: 150 50% 55% (Gentle green for streaks)
- Border: 210 15% 88% (Subtle dividers)

**Dark Mode:**
- Primary: 220 20% 10% (Deep navy-black)
- Surface: 220 18% 15% (Elevated cards)
- Accent: 160 35% 55% (Muted sage for contrast)
- Secondary Accent: 250 30% 60% (Softer lavender)
- Text Primary: 210 15% 92% (Soft white)
- Text Secondary: 210 10% 60% (Warm gray)
- Border: 220 15% 22% (Gentle dividers)

### B. Typography

**Font Families:**
- Primary: 'DM Sans' (Friendly, approachable, highly readable)
- Display: 'Crimson Pro' (Gentle serif for journal entries, quotes)

**Scale:**
- Hero/Display: text-4xl to text-6xl, font-display, font-light
- Section Headers: text-2xl to text-3xl, font-medium
- Card Titles: text-lg to text-xl, font-medium
- Body: text-base, leading-relaxed (generous line-height)
- Journal Entry: text-base to text-lg, font-display, leading-loose
- Captions: text-sm, text-secondary
- Metrics: text-3xl to text-4xl, font-semibold (for analytics)

### C. Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 24 (focus on generous breathing room)

**Grid System:**
- Mobile: Single column, px-4, py-6
- Tablet: 2-column for dashboard widgets, px-8
- Desktop: Max-w-4xl centered content (narrow for focus), max-w-6xl for analytics, px-12

**Key Layouts:**
- Journal Entry: Max-width prose (optimal reading), centered, ample padding
- Dashboard: Card-based grid, gap-6 to gap-8
- Analytics: 2-3 column metrics, line charts full-width

### D. Component Library

**Navigation:**
- Top Bar: Clean, minimal, sticky with subtle shadow, Journal / Insights / Profile
- Mobile: Bottom navigation with icons + labels
- Desktop: Sidebar (collapsed option) with section navigation

**Journal Components:**
- Entry Card: Rounded-2xl, p-8, shadow-sm, hover:shadow-md transition
- Writing Interface: Full-screen distraction-free mode option, floating toolbar
- Mood Selector: Emoji-based or color gradient slider, prominent but not overwhelming
- Entry List: Timeline view with date headers, preview text, mood indicator dot

**Analytics & Insights:**
- Mood Chart: Smooth line graph, soft gradient fills, rounded corners
- Streak Counter: Large centered number with encouraging message
- Pattern Cards: Icon + metric + brief insight, 3-column grid
- Wellness Score: Circular progress indicator with calming animation
- Trend Summaries: Text-based with subtle icon, card format

**AI Suggestions:**
- Suggestion Card: Light accent background, rounded-xl, p-6, gentle border
- Prompts: Italicized question text, ample space to breathe
- Affirmations: Centered text, larger font, soft background glow

**Forms & Inputs:**
- Text Area: Rounded-xl, border-2, generous padding (p-4), focus ring in accent
- Date Picker: Clean calendar grid, today highlighted
- Tags: Rounded-full pills, soft accent backgrounds (opacity-20)
- Buttons: Primary (solid accent), Secondary (ghost/outline), rounded-lg, px-6 py-3

**Data Displays:**
- Stats Grid: Simple cards with icon, number, label - clean hierarchy
- Calendar Heatmap: Gentle color gradients showing activity
- Emotion Wheel: Circular visualization with soft colors

**Overlays:**
- Modals: Centered, max-w-lg, rounded-3xl, p-8, backdrop-blur-md
- Bottom Sheets: Mobile slide-up for quick actions
- Success Toasts: Top center, rounded-full, auto-dismiss with gentle fade

### E. Animations

**Minimal & Purposeful:**
- Page Transitions: Gentle fade (200ms)
- Card Hover: Subtle lift (hover:translate-y-[-2px])
- Chart Reveals: Smooth draw-in on load (1s ease)
- Streak Celebrations: Confetti or gentle pulse on milestones
- NO distracting motion, NO auto-playing content

## Images

**Hero Section (Landing Page):**
- Serene nature scene: misty forest path, calm lake at dawn, or meditative garden
- Soft gradient overlay for text legibility
- Height: h-[70vh] to h-screen
- Treatment: Subtle blur effect (backdrop-blur-sm) on overlay for dreamy quality

**Additional Images:**
- Feature Illustrations: Custom minimalist line art (journaling, meditation, growth metaphors)
- Testimonial Section: Soft-focus abstract backgrounds (bokeh, watercolors)
- Dashboard Empty States: Gentle illustrations encouraging first entry
- Success Moments: Abstract celebratory visuals for milestones

**Image Treatment:**
- Always rounded-2xl to rounded-3xl
- Soft shadows (shadow-lg with low opacity)
- Muted, calming color palettes in all imagery
- Avoid stark contrasts or energetic visuals

## Page Structure

**Landing Page (5-7 Sections):**
1. **Hero:** Calming background image, centered headline "Your Safe Space for Reflection", subtitle about growth, primary CTA "Start Your Journey"
2. **Journal Feature:** 2-column split - screenshot of journal interface + description of distraction-free writing
3. **AI Insights:** 3-column cards showing mood tracking, pattern recognition, personalized prompts with icons
4. **Analytics Showcase:** Large dashboard mockup showing trend charts, streak counter, emotional patterns
5. **Privacy & Safety:** Centered text with lock icon, emphasizing data security and confidentiality
6. **Testimonials:** 3 cards with user quotes (anonymous), soft backgrounds
7. **Final CTA:** Image background with encouraging message, "Begin Your Wellness Journey Today"
8. **Footer:** Newsletter (optional), resources, privacy policy, social proof

**App Dashboard:**
- Welcome Message: Personalized greeting, current streak
- Quick Journal Entry: Prominent card with today's prompt
- Mood Check-in: One-tap mood selector
- Recent Entries: Timeline preview (3-5 recent)
- Insights Widget: Mini-chart or key metric
- Suggested Actions: AI-powered wellness suggestions

**Journal View:**
- Calendar navigation or infinite scroll timeline
- Entry cards with date, mood, preview, tags
- Search and filter by mood/tags
- Floating "New Entry" button

**Analytics Dashboard:**
- Date Range Selector: Last 7/30/90 days
- Key Metrics Row: Streak, total entries, average mood (3-column)
- Mood Trend Chart: Line graph with smooth curves
- Emotion Distribution: Pie or bar chart
- Pattern Insights: AI-generated text cards
- Export/Share Options: For therapist/personal records

**Entry Detail:**
- Full journal text with Crimson Pro font
- Metadata: Date, mood, tags
- AI-suggested reflections below entry
- Edit/Delete actions (subtle)