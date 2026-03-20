export class TrevorEngine {
  private wordBank: string[] = ["hello", "trevor", "ai", "learning"];
  private chains: Record<string, string[]> = {};

  public learn(input: string) {
    const words = input.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      this.wordBank.push(word);

      // Create a context chain (Markov Chain logic)
      if (i < words.length - 1) {
        const nextWord = words[i + 1];
        if (!this.chains[word]) this.chains[word] = [];
        this.chains[word].push(nextWord);
      }
    }
    
    // Keep the brain from exploding
    if (this.wordBank.length > 2000) this.wordBank.shift();
  }

  public getResponse(userInput: string): string {
    this.learn(userInput);
    
    const inputWords = userInput.toLowerCase().split(/\s+/);
    const seed = inputWords[Math.floor(Math.random() * inputWords.length)];
    
    let currentWord = this.chains[seed] 
      ? seed 
      : this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
      
    let response = [currentWord];

    // Generate a sentence up to 8 words long
    for (let i = 0; i < 7; i++) {
      const possibilities = this.chains[currentWord];
      if (possibilities && possibilities.length > 0) {
        currentWord = possibilities[Math.floor(Math.random() * possibilities.length)];
        response.push(currentWord);
      } else {
        // Break or jump to a random known word
        break;
      }
    }

    const final = response.join(" ");
    return final.charAt(0).toUpperCase() + final.slice(1) + ".";
  }
}
