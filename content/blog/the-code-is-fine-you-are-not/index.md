---
title: The code is fine—You are not
date: '2026-03-15T10:00:00.000Z'
description: The pressure to achieve perfection in software engineering can lead to anxiety and burnout. Key points include the struggle with communication about feelings, the cycle of perfectionism and procrastination, and the impact of external expectations. Embracing imperfection and acknowledging human limitations is essential for sustainable work.
type: post
cover: './cover.jpg'
---

You're good at what you do. You've untangled race conditions, pixel-pushed a UI until it matched the design down to the last shadow, wired up CI pipelines that deploy on green, and debugged production issues at 3 AM on a Saturday. You've navigated framework migrations, accessibility audits, and that one API that returns a different shape every other Tuesday.

But today, the cursor just blinks.

People are chatting in Slack as if they never talk to a human before in their lives. The AI dumps screens of code you don't want to read—I mean, how much code you can possibly review written by this *thing*. You scan the docs and a couple of Stack Overflow answers; they disagree. Your team is waiting, and you're out of ideas.

You try the workaround. It doesn't fit your constraints. You chase the fix and hit another pile of bottlenecks. You finally have something, but you hesitate to open a PR—you don't want yet another design debate.

Standup is in 10 minutes. You'll say, "I'm making progress," even though you know it's nowhere near true. And all of this before a 2-hour planning meeting that will destroy your energy.

Now, you're chatting with the AI again to review the code and fix what's fixable. You don't care anymore about reading that code—your colleagues will review it anyway.

If this feels familiar, you're not alone—and it's not about the code.

## The Paradox We Don't Talk About

Here's something strange about software engineering: we've learned to speak with absolute precision to machines. We can express complex logic, handle edge cases, and architect systems that process millions of requests. Our IDEs autocomplete our thoughts. Our types catch our mistakes before runtime.

But when it comes to talking about how we *feel* about our work? We're terrible at it.

We communicate fluently in TypeScript and Python, but we stumble over admitting we're anxious about a deadline. We can articulate the difference between eventual consistency and strong consistency, but we can't articulate why we feel inadequate when a colleague ships faster than we do. 

> We've optimized for machine communication at the expense of human connection.
> 

And somehow, that precision we demand from our code has bled into how we see ourselves. We want to be **perfect**. We want our solutions to be elegant, our architecture to be flawless, our knowledge to be complete. And when we inevitably fall short of that impossible standard, we don't talk about it. We just carry it.

The situation gets worse in company cultures that treat people like machines. Requirements in, code out. No time for mistakes. No room to fail.

## Where This Comes From

This isn't new. It's not unique to software engineering. But it hits us harder because of how we got here.

Think back to how many of us ended up in tech. Growing up, we were the kids who got good grades—or just people who were good with computers. We were praised for being smart, for knowing how to deal with tech, for solving problems. 

> Our parents, our teachers, our entire environment reinforced a simple equation: **being the best = being valuable**.
> 

We internalized that. We learned that our worth was tied to our performance. That being good wasn't good enoug—we had to be *the* *best*. 

When you carry that mindset into a career like software engineering—where there's *always* more to learn, *always* someone who knows more, *always* a better way to solve the problem—it becomes a weight you can never put down.

That voice that says "this code isn't good enough yet" isn't really about the code. It's the echo of every time we were told to *do* better, *be* better, try *harder*. **It's the internalized belief that if we're not perfect, we're not worthy.**

In a still [male‑dominated field](https://www.zippia.com/software-engineer-jobs/demographics/), many of us absorb quiet rules of restraint: stay composed, avoid showing doubt, handle it alone. Those norms make it harder to ask for help or name it when we're stuck.

"I'm fine" becomes our default API—even when we feel like we *suck*.

## How It Shows Up Every Day

Here's the cycle:

**Perfectionism** stops you from starting. You hold back code because you're not sure the approach is "right." You avoid asking in Slack. You don't share work until it's over‑polished.

That perfectionism turns into **procrastination**. You spend hours searching for the "best" solution instead of shipping the working one. You refactor the same function again. You wait for the perfect moment—and it never comes.

Procrastination builds **anxiety**. The deadline hasn't moved. Standup is coming. The PR is overdue. Expectations stay put; now you're *behind*.

**Anxiety then reinforces perfectionism**. The stakes feel higher, so you raise the bar, second‑guess more, and delay again—completing the loop.

It's a loop that's hard to break.

## How it can lead to burnout

Here's how that loop showed up on my team.

I once had an engineer who struggled to finish his tasks. He'd pick up the ticket, lose confidence, and start over. Dates slipped with "I'll have something by Monday." But we all knew it wouldn't happen—and found ourselves guessing what excuse Monday would bring. Ask "what's next?" and suddenly more research has to be done. You could feel him trying to change the subject to waste time in a call, so we didn't have enough time to discuss his progress.

Does this sound familiar? It's the same cycle — perfectionism, procrastination, the excuses at standup. 

As an engineering manager leading 16 engineers across different client projects — with two second-level managers reporting to me — I had visibility into how this pattern plays out across different teams, codebases, and stakeholder pressures. It wasn't isolated to one project or one personality. I saw it repeat across people, seniority levels, and contexts. But what struck me most wasn't the pattern — it was how easy it was to misjudge it.

It's easy to call my colleague lazy, but the reality is more complicated. 

He was stuck chasing *perfection*. This was obvious to me because I'd struggled with it for years. In fact, that's how I ended up starting this blog in the first place. I wish I could just press a button to install this understanding in his brain, but these things are hard to accept—and even harder when someone else is flagging them for you.

There's a useful distinction here. Researchers talk about two kinds of burnout: **overwork burnout** and **misalignment burnout**. The first is about volume—too many hours, too little rest. The second is about working on the wrong things, or feeling a persistent gap between what you value and what you actually deliver. The critical difference: 

> Rest fixes *overwork*. It doesn't fix *emptiness*. You come back from vacation and the same emptiness is waiting at your desk.
> 

My colleague wasn't drowning in tasks. He was drowning in the distance between his internal standard and his actual output. That's misalignment burnout dressed as procrastination. And it's harder to spot—because from the outside, it just looks like someone isn't trying hard enough.

Over time, the anxiety can spread. It's not just one deadline—it shows up in standups, when replying in Jira, and when you're thinking about work in the evening. That's worth noticing.

And what's our coping mechanism? Lunch break, you open the app to decompress; the algorithm pulls up a chair and serves fear with a side of envy, followed by an ad for exactly what you didn't know you needed.

Repeat this, project after project, and you already know where it leads. You won't rage-quit or delete your LinkedIn profile. It's slower than that. You still show up, still deliver, but you're running on empty. 

> The work that used to *excite* you now just *exhausts* you.
> 

Ah yes, and **FOMO** feeds the entire cycle. 

## **The Day I Missed the News**

Staying relevant as a software engineer has become increasingly complex.

I speak at conferences about AI. I build agentic platforms. People expect me to be "on it." And yet, I missed the model release everyone was talking about—didn't see it until questions started landing in my inbox.

For a moment, I felt that familiar panic: if I missed this, what else am I missing? I opened five tabs, skimmed three threads, and queued up two demos. The pressure in my head went up another notch. I'm supposed to be the one who tells *them* what's coming — not the other way around.

People always ask me what they should learn to stay relevant. Nowadays it's all about AI. The question never changes; only the thing they're afraid of does. They worry that the way their organizations work today won't give them a competitive advantage in the job market tomorrow.

But beneath the FOMO lies something heavier: the fear that AI won't just change *how* we work—it'll erase *why* we work. For many of us, software engineering isn't just a job. It's our identity, our status, the thing that affords the life we've built. The apartment, the stability, the sense that we figured it out. When the ground shifts under that, the anxiety isn't about missing a model release. It's about losing the version of yourself you've spent years constructing.

No one knows what this industry looks like in five years. And that uncertainty is a breeding ground for misalignment burnout—because how do you align your work with your values when you're not sure the work will exist tomorrow? You end up working *harder* on things that feel increasingly *meaningless*, just to stay in the game. 

That's not overwork. That's existential drift.

The AI explosion has turned FOMO into a full-time job, and feeling incompetent next to an AI supermachine only makes things worse. Every day there's a new model, a new framework, a new capability. Every day the frontier moves.

> The myth says a "10x engineer" would keep up with all of it. Reality says we have limited time, energy, and retention.
> 

Missing the news, or not following a new trend isn't failure. It's proof that I'm human—and that curation beats compulsive catching up.

## How to reflect

I'm not a psychologist. I'm not going to prescribe solutions or give you a five-step plan. That's not what this is.

All I *can* tell you is this: The stress you feel isn't just about the code, your team, or the world. It's about the **unspoken expectations**—the ones you place on yourself, the ones you think others have of you, the ones that come from being told to be the best for your entire childhood.

Mo Gawdat, a former Google X engineer, wrote a book called [*Solve for Happy*](https://www.amazon.com/Solve-Happy-Engineer-Your-Path/dp/1501157558) where he treats happiness like an engineering problem. 

```markdown
Happiness = Your Perception of Events − Your Expectations of Life
```

His equation is simple: unhappiness lives in the gap between your expectations and your perception of reality. Sound familiar? That's the perfectionism loop, expressed as math. I highly recommend it — especially to engineers. It's one of the few books that speaks our language.

Our work isn't simple. Machines are straightforward—they do what you tell them; when they don't, you can debug why. People are different: unclear requirements, shifting priorities, unstated assumptions, their own anxieties. We're not as good at debugging that.

Maybe naming it helps. Maybe knowing your teammates feel the same way helps too—you can help each other. Maybe realizing perfectionism isn't a virtue—it's conditioning—gives you permission to be kinder to yourself.

Or maybe it doesn't. Maybe this is just one more thing to think about, one more weight to carry.

But at least now we're talking about it.

## A Personal Note

I wrote this after stepping back for a while from the content creation habits. I needed to slow down before I burned out completely. And it was a very hard decision to make. I had to force myself to do it.

It's easy to think that stepping back means falling behind. That if you're not constantly productive, learning, shipping, you're losing ground. But sometimes the most productive thing you can do is give yourself space to *breathe*.

The perfectionism, the anxiety, the feeling that you're falling behind is something we all carry at a certain degree. It doesn't mean something's wrong with you. It means you're *human*, working in a field that moves fast and demands a lot.

The work will still be there tomorrow. The frameworks will still be there. You don't have to know everything, be everything, or keep up with everything to be a good engineer.

---

A few things to sit with:

- The code doesn't have to be perfect to be valuable
- Knowing everything is not the job - solving problems is
- Anxiety about your work is not the same as caring about your work
- It's okay to say "I don't know" and "I need help"
- The 10x engineer who knows everything doesn't exist, and pretending they do hurts everyone
- If rest doesn't help, the problem might not be the workload — it might be what the work is