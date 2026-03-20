export class TrevorEngine {
  private wordBank: string[] = ["how", "to", "build", "ai", "trevor", "is", "cool"];
  private trigrams: Record<string, string[]> = {};
  // Trevor's "Offline" Web Results (You can add more facts here)
  private webKnowledge: Record<string, string> = {
    "weather": "The weather is currently being simulated in Trevor's brain as sunny.",
    "time": `The current year is 2026.`,
    "nextjs": "Next.js is a React framework for building full-stack web applications.",
    "trevor": "Trevor is a self-learning Markov-chain AI created to be smarter than average."
  };

  public learn(input: string) {
    const words = input.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    for (let i = 0; i < words.length - 2; i++) {
      const key = `${words[i]} ${words[i+1]}`;
      if (!this.trigrams[key]) this.trigrams[key] = [];
      this.trigrams[key].push(words[i+2]);
      this.wordBank.push(words[i]);
    }
  }

  private searchWeb(query: string): string | null {
    const lowerQuery = query.toLowerCase();
    for (const key in this.webKnowledge) {
      if (lowerQuery.includes(key)) return this.webKnowledge[key];
    }
    return null;
  }

  public getResponse(userInput: string): string {
    // Check if user is asking a "Search" question
    const searchResult = this.searchWeb(userInput);
    if (searchResult) return `[WEB SEARCH] ${searchResult}`;

    this.learn(userInput);
    const words = userInput.toLowerCase().split(/\s+/);
    
    // Pick a starting point from the user's last message
    let w1 = words[Math.floor(Math.random() * words.length)];
    let w2 = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    
    let result = [w1, w2];
    for (let i = 0; i < 12; i++) {
      const key = `${w1} ${w2}`;
      const options = this.trigrams[key];
      if (options && options.length > 0) {
        const next = options[Math.floor(Math.random() * options.length)];
        result.push(next);
        w1 = w2;
        w2 = next;
      } else {
        break;
      }
    }

    const final = result.join(" ");
    return final.charAt(0).toUpperCase() + final.slice(1) + ".";
  }
}
