export class TrevorEngine {
  private wordBank: string[] = ["i", "am", "trevor", "hello", "how", "are", "you"];
  private contextMap: Record<string, string[]> = {};

  public learn(input: string) {
    const words = input.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(w => w.length > 0);
    
    for (let i = 0; i < words.length; i++) {
      this.wordBank.push(words[i]);
      
      // Look-ahead learning: remembers that Word B follows Word A
      if (i < words.length - 1) {
        const key = words[i];
        if (!this.contextMap[key]) this.contextMap[key] = [];
        this.contextMap[key].push(words[i + 1]);
      }
    }
  }

  public getResponse(userInput: string): string {
    this.learn(userInput);
    const inputWords = userInput.toLowerCase().split(/\s+/);
    
    // Start the thought with a word the user just used
    let currentWord = inputWords[Math.floor(Math.random() * inputWords.length)];
    if (!this.wordBank.includes(currentWord)) {
      currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    }

    let result = [currentWord];
    
    // Attempt to build a coherent 5-10 word sentence
    for (let i = 0; i < 8; i++) {
      const nextOptions = this.contextMap[currentWord];
      if (nextOptions && nextOptions.length > 0) {
        currentWord = nextOptions[Math.floor(Math.random() * nextOptions.length)];
      } else {
        currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
      }
      result.push(currentWord);
      if (result.length > 4 && Math.random() > 0.8) break; 
    }

    const sentence = result.join(" ");
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  }
}
