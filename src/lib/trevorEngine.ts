export class TrevorEngine {
  private vocab: string[] = "abcdefghijklnopqrstuvwxyz".split("");

  public learn(input: string) {
    const cleanInput = input.toLowerCase().replace(/[^a-z]/g, "");
    for (let char of cleanInput) {
      if (char.trim()) this.vocab.push(char);
    }
    if (this.vocab.length > 1000) this.vocab = this.vocab.slice(-1000);
  }

  private generateWord(): string {
    const length = Math.floor(Math.random() * 5) + 3;
    let word = "";
    for (let i = 0; i < length; i++) {
      word += this.vocab[Math.floor(Math.random() * this.vocab.length)];
    }
    return word;
  }

  public getResponse(userInput: string): string {
    this.learn(userInput);
    const count = Math.floor(Math.random() * 3) + 2;
    const words = Array.from({ length: count }, () => this.generateWord());
    return words.join(" ") + ".";
  }
}
