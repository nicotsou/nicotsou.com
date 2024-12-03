---
title: The Rules Of Prompting
date: '2024-12-03T22:12:00.000Z'
description: Guidelines and best practices for effective prompt engineering when interacting with generative AI models.
type: post
cover: './cover.png'
---

Learn Prompt Engineering, they say. It's the skill of the future, they say.

But with all the buzz around prompt engineering and people sharing their "secret prompts," we often get lost in thinking that prompting is similar to traditional coding. We see complex, multi-page prompts with intricate instructions and think that's what we need to master.

The reality is much simpler and more straightforward. Prompting is not about writing complex algorithms or mastering syntax - it's about clear, effective communication in natural language. While programming requires learning specific syntax and rules, prompting leverages something we already know: how to express our thoughts clearly.

> “Generative AI is teaching us that the way you speak is actually code itself” — Lisa Huang

Language, like code, is structured, precise, and can be "interpreted" by humans to perform tasks or generate responses. In generative AI, our words, syntax, and tone act as a programming language for interacting with models. Just as specific code produces particular software results, the way we phrase our input directly shapes the AI's output.

However, just like in human communication, it's not just about that - it's also about understanding our conversation partner. In this case, that means understanding the quirks, limitations, and peculiarities of Generative AI.

![Clickbait titles from YouTube videos](images/prompt-engineering-clickbait.png)
_No, you don't need any of that. Focus on mastering the basics instead._

These AI models, despite their impressive capabilities, come with their own set of challenges. They can occasionally "hallucinate" facts, struggle with complex logical reasoning, or misinterpret nuanced instructions. They might confidently provide incorrect information or fail to maintain consistency across long conversations.

Let me introduce you to the fundamental rules of Prompt Engineering. Note that the examples I’m providing are quick ideas to help improve your existing prompts. They are not meant to be used exactly as shown.

Alright! Grab a coffee and let's dive in. ☕️

## Rule #1 — **Provide clear and specific _instructions_.**

If you ask a friend to make you a cappuccino, they will probably come back with a delicious hot beverage to satisfy you. But if you ask your friend "Did you use non-dairy milk, because I'm lactose intolerant?", they will most likely get surprised and think "How should I know?".

Because you were not precise and specific with what kind of cappuccino you wanted, your friend just assumed you would go with the most common one. The same applies with LLMs.

Yes, LLMs are trained on vast amounts of data, encompassing a wide array of topics and contexts. But in order to get the desired result, you need to be specific about your request so the model can deliver focused output. Be clear about what you want the AI to do by providing sufficient parameters.

<aside>

**Don’t just prompt:** "Write a poem about email."

**Prompt:** "Draft an informal email to my manager requesting time off."

</aside>

Minimize vague or imprecise descriptions and focus on what to do instead of what not to do. This is your way towards accurate, relevant responses.

Here’s a better example:

<aside>

**Don’t just prompt:** What should I avoid when designing a user interface?

**Prompt:** What are the _best practices_ when designing an _accessible_, _user-friendly_ web interface?

</aside>

I clearly specify what are my expectations about designing a great user interface.

![Hey, what happened with my coffee? Hello?](images/coffee.png)
_Hey, what happened with my coffee? Hello?_

## Rule #2 — **Always _evaluate_ your output.**

Each AI model has a unique training set, relies on different programming techniques, and has a specific knowledge cutoff date. Therefore, it's essential to critically assess each output to ensure it's accurate and useful for your needs.

<aside>

**Always ask if your response is**

- Consistent
- Unbiased
- Relevant
- Accurate
</aside>

For example, the word “Terminal” relates to _Transportation_ and _Computing._ If a user asks about "Terminal," the AI might provide information about airport terminals without considering the computing context.

## Rule #3 — **_Context_ is king!**

When software architects are about to make an important decision, they always ask for context. Any situational or background information may drive the decision towards a specific direction. The same can happen with your prompts.

For example, when seeking coding help, specifying that you're using React with Material UI as your component library will get you more targeted responses than simply asking "How to create a login form with React?". This context enables the AI to understand your specific technical environment and provide more relevant, actionable advice.

Here’s an example:

<aside>

**Prompt:** Create an architecture document for our _cloud migration project_. This _project is crucial_ as we are _transitioning our infrastructure to AWS_ to _improve scalability_ and _performance_.

</aside>

I’m giving a clue about the quality attributes I’m targeting, such as scalability and performance, ensuring the AI tailors its suggestions to meet these priorities.

## Rule #4 — **Keep your instructions relatively _short_.**

We all have that colleague who writes such long emails that you need an AI assistant to summarize them. "Copilot, what does this guy want from my life?"

When crafting prompts for AI, brevity is your ally. Long, convoluted instructions often lead to confusion and diluted responses. Instead, focus on being concise while including essential details that guide the AI towards your desired outcome.

> Repeating the same sentence multiple times won't make your prompt more effective.

Think of it like sending a text message - you want to be clear and get your point across without writing a novel. The key is finding the sweet spot between providing enough detail for clarity while keeping your instructions concise and focused.

<aside>

**Don’t prompt:** I'm working on a system that needs to handle various client requests, and I'm having trouble figuring out how to design the architecture to manage scalability and performance issues that come up. Can you point me in the right direction?

**Prompt:** How do I implement a scalable and performant software architecture to handle high volumes of client requests?

</aside>

## Rule #5 — **Using _references_ reduces guesswork**

Using examples and references from trusted sources makes your prompts better. When you mention well-known books, frameworks, or methods that experts use, you help the AI understand exactly what you want. This makes the model’s answers more reliable and helps it follow common industry practices.

<aside>

**Prompt:** Draft a whitepaper for the engineering team in our organization that emphasizes the importance of cloud-native applications, _drawing inspiration_ from seminal works like _Martin Fowler's Patterns of Enterprise Application Architecture_ and _Eric Evans's Domain-Driven Design_.

</aside>

In the previous example, I’m using references from well-known leaders my target audience understand and relate to. When experts in the field see references like Martin Fowler's work, they immediately grasp the architectural principles and patterns we're aiming for. This helps establish credibility and provides a shared foundation for technical discussions.

![Firefly 20241127173921.png](images/Firefly-artwork-1.png)

## Rule #6 — **Keep the _conversation context_ consistent**

We all have that friend who starts telling a story about their weekend, then suddenly jumps to talking about their cat's vet appointment, only to circle back to a completely different story about their cousin's wedding. By the end of the conversation, you're not sure if the cat went to the wedding or if the cousin was at the vet! This constant context switching makes it difficult to follow the narrative and often leads to misunderstandings.

When you mix different topics or contexts within the same conversation with an AI model, it can lead to confusion and potentially inaccurate responses. Here's why keeping contexts separate is important:

- Each conversation builds up a specific context and memory that helps the AI understand the topic at hand. When you suddenly switch topics, you risk the AI mixing information from different contexts.
- Jumping between unrelated topics can confuse the model and result in less accurate responses.

<aside>

Best practices to maintain clear context:

- Keep questions relevant to the current conversation thread
- If you need to discuss a new topic, begin a new chat session rather than continuing in the same one
</aside>

This approach helps ensure more accurate and focused responses from the AI model, reducing the likelihood of context-related errors or hallucinations.

## Rule #7 — **Be mindful of the _conversation memory_.**

AI models can chat with us naturally, but they have a simple limitation: they can't remember things like humans do. They only work with the information you give them right now, in your current prompt. Think of it like talking to someone that suffers from amnesia. If you mention something you said some minutes ago without explaining it again, they might not understand what you're talking about.

AI agents maintain conversation context by resending the chat history with each new message. This ensures the LLM has all the information needed for accurate responses. However, the context window of a prompt is limited. You can only include a certain number of tokens, which varies depending on the model you're using. If your conversation grows too long, it may exceed this context window.

Remember that the AI won't remember all of your previous messages. If you’re implementing a chatbot application using a foundation model, you should manage the memory on your own.

## Rule #8 — **Choose your _words_ wisely.**

When the entire organization uses a prompt, would you accept having grammatical or syntactic errors? Here are key elements to avoid when crafting prompts, as they can significantly impact the quality and reliability of AI responses:

- Using bad grammar, wrong sentence structure, or typos - these mistakes can make it hard for AI to understand what you want
- Using complex technical jargon when plain language would work better, unless your specific domain requires technical terminology
- Using informal language, local idioms, or slang that your model may not be trained to understand

And believe it or not, being negative or impolite may also impact your prompt response. This is because AI models are trained on data where polite, respectful language often leads to higher-quality responses. Additionally, LLMs might simulate emotional states conceptually, though they do not experience emotions as humans do. Just keep in mind that overly complex politeness (e.g., excessively indirect requests) can confuse the model and reduce response quality.

Now, it’s true that while flagship models are quite capable of bypassing these imperfections, older and smaller LLMs have limited ability to handle such issues, making clear communication even more critical.

![Firefly 20241127180845.png](images/Firefly-artwork-2.png)

## Rule #9 — **Eliminate _biased_ language**

Personal feelings or subjective experiences may cause biased output as a result. This can lead to responses that favor one approach without considering alternatives or drawbacks.

<aside>

**Don’t prompt:** Why microservices are the best solution for scaling modern applications?

**Prompt:** What are the advantages and tradeoffs of using microservices compared to other architectural styles for scaling modern applications?

</aside>

The previous example demonstrates personal preferences might overshadow objective analysis of different solutions. To avoid this, frame your prompts in a way that encourages balanced, objective responses that consider multiple perspectives.

Additionally, overlooking ethical and legal considerations in your prompts could result in responses that may be inappropriate or potentially harmful. Always frame your prompts to encourage factual, balanced responses that respect ethical boundaries and legal constraints. This approach not only yields more reliable results but also promotes responsible AI usage.

## Rule #10 — **Use _special syntax_ to express your ideas.**

Sometimes, expressing ideas through structured formats like tables, mathematical equations, metrics, or code snippets can be more effective than using plain text descriptions. Despite being limited to text-based communication with AI models, we can leverage various formatting techniques to convey our ideas precisely.

Using special syntax or structured formats in your prompts can help organize information and make your requirements clearer to the AI. XML-like tags, markdown formatting, or custom delimiters can create a clear structure that guides the model to understand and process different components of your request separately.

```jsx
Write a product description.

<product>
  ## Smart Home Security Camera

  Features:
  **4k video quality** for clear footage
  **Night vision** capability up to 30 feet
  **Motion detection** alerts sent directly to your phone
</product>
```

In the previous example, we are using a XML tag to differentiate the part of the product information from the rest of the prompt. We also use Markdown syntax to format the text. We help the LLM recognize the different parts of the prompt.

This approach is particularly useful when dealing with complex prompts that contain multiple elements or require specific formatting in the output.

---

## That’s all folks! 🙌

Thanks for reading! Stay tuned for more content about prompt engineering! I'll be sharing advanced techniques, real-world examples, and practical strategies to help you master the art of communicating with AI. My newsletter form is just a few DOM elements below. Don't forget to subscribe to get notified when new articles are published.

Remember that effective prompting is an iterative process; don't hesitate to refine your approach based on the responses you receive. Do you have any other tips for crafting better prompts? I'd love to hear your thoughts and experiences.

Cover art generated with Adobe Firefly.
