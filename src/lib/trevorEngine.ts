export class TrevorEngine {
  private vocab: string = "abcdefghijklnopqrstuvwxyz";

  // Generates a random "word" by picking characters from your vocab
  private generateWord(length: number): string {
    let word = "";
    for (let i = 0; i < length; i++) {
      word += this.vocab.charAt(Math.floor(Math.random() * this.vocab.length));
    }
    return word;
  }

  public getResponse(userInput: string): string {
    const wordCount = Math.floor(Math.random() * 5) + 2; // Generate 2-7 words
    const response: string[] = [];

    for (let i = 0; i < wordCount; i++) {
      const wordLength = Math.floor(Math.random() * 6) + 3; // Words 3-9 chars long
      response.push(this.generateWord(wordLength));
    }

    return response.join(" ") + ".";
  }
}
