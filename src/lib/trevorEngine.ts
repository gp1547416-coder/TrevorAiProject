export class TrevorEngine {
  // Trevor's base vocabulary
  private vocab: string[] = "abcdefghijklnopqrstuvwxyz".split("");

  // This function allows Trevor to "learn" from what you type
  public learn(input: string) {
    const cleanInput = input.toLowerCase().replace(/[^a-z]/g, "");
    for (let char of cleanInput) {
      // Trevor adds your characters to his internal memory
      this.vocab.push(char);
    }
    // Keep memory manageable (last 500 characters)
    if (this.vocab.length > 500) {
      this.vocab = this.vocab.slice(-500);
    }
  }

  private generateWord(length: number): string {
    let word = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.vocab.length);
      word += this.vocab[randomIndex];
    }
    return word;
  }

  public getResponse(userInput: string): string {
    // First, Trevor learns from what you just said
    this.learn(userInput);

    const wordCount = Math.floor(Math.random() * 4) + 2; 
    const response: string[] = [];

    for (let i = 0; i < wordCount; i++) {
      const wordLength = Math.floor(Math.random() * 5) + 3;
      response.push(this.generateWord(wordLength));
    }

    return response.join(" ") + ".";
  }
}
