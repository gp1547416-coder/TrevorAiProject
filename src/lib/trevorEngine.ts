export class TrevorEngine {
  private wordBank: string[] = ["assistant", "helpful", "knowledge", "learning", "ai"];
  private trigrams: Record<string, string[]> = {};
  
  private emojis: string[] = ["✨", "🚀", "🤖", "💡", "🧠", "✅", "🌟", "📊"];
  private greetings: string[] = [
    "Hello! I'm Trevor, your AI assistant. How can I help you today?",
    "I've processed your input! Here's what I've learned:",
    "That's a fascinating point! Based on my current data..."
  ];

  public learn(input: string) {
    const words = input.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    for (let i = 0; i < words.length - 2; i++) {
      const key = `${words[i]} ${words[i+1]}`;
      if (!this.trigrams[key]) this.trigrams[key] = [];
      this.trigrams[key].push(words[i+2]);
      this.wordBank.push(words[i]);
    }
  }

  public getResponse(userInput: string): string {
    this.learn(userInput);
    
    // 1. Start with a ChatGPT-style greeting
    const intro = this.greetings[Math.floor(Math.random() * this.greetings.length)];
    
    // 2. Generate the "Thought" (Core Logic)
    let w1 = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    let w2 = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    let result = [w1, w2];

    for (let i = 0; i < 15; i++) {
      const key = `${w1} ${w2}`;
      const options = this.trigrams[key];
      if (options && options.length > 0) {
        const next = options[Math.floor(Math.random() * options.length)];
        result.push(next);
        w1 = w2; w2 = next;
      } else { break; }
    }

    // 3. Assemble with emojis
    const coreMessage = result.join(" ");
    const randomEmoji = () => this.emojis[Math.floor(Math.random() * this.emojis.length)];
    
    return `${intro} ${randomEmoji()}\n\n${coreMessage.charAt(0).toUpperCase() + coreMessage.slice(1)}. ${randomEmoji()}\n\nIs there anything else you'd like to explore together? 🚀`;
  }
}
