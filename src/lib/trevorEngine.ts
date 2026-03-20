export class TrevorEngine {
  public getResponse(input: string): { text: string, code?: string } {
    const low = input.toLowerCase();
    
    // 1. DYNAMIC SHAPE DETECTOR
    let shapes = "";
    if (low.includes("table")) {
      shapes = `
        <div style="width: 120px; height: 10px; background: #8B4513; margin: 0 auto; border-radius: 4px;"></div>
        <div style="display: flex; justify-content: space-around; width: 120px; margin: 0 auto;">
          <div style="width: 6px; height: 40px; background: #5D2E0A;"></div>
          <div style="width: 6px; height: 40px; background: #5D2E0A;"></div>
        </div>`;
    } else if (low.includes("spoon")) {
      shapes = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 35px; height: 50px; background: linear-gradient(gray, silver); border-radius: 50%;"></div>
          <div style="width: 8px; height: 70px; background: silver; border-radius: 0 0 4px 4px;"></div>
        </div>`;
    } else {
      // If it's something else, try to build a generic 3D structure
      shapes = `<div style="width: 80px; height: 80px; background: linear-gradient(45deg, #3b82f6, #9333ea); border-radius: 12px; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; text-align: center;">DYNAMIC MODEL</div>`;
    }

    // 2. DYNAMIC ANIMATION DETECTOR
    let animationName = "none";
    let keyframes = "";
    
    if (low.includes("flip") || low.includes("flipping")) {
      animationName = "flipit 2s infinite linear";
      keyframes = `@keyframes flipit { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }`;
    } else if (low.includes("spin") || low.includes("spinning")) {
      animationName = "spinit 3s infinite linear";
      keyframes = `@keyframes spinit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    }

    const finalCode = `
      <style>${keyframes}</style>
      <div style="perspective: 800px; padding: 40px; display: flex; justify-content: center;">
        <div style="animation: ${animationName}; transform-style: preserve-3d;">
          ${shapes}
        </div>
      </div>`;

    return {
      text: this.generateChatGPTRant(input),
      code: finalCode
    };
  }

  private generateChatGPTRant(input: string): string {
    const lines = [
      `I have processed your request to synthesize a live-coded render of: "${input}".`,
      "My neural engine has mapped the linguistic intent to a series of CSS keyframes.",
      "By utilizing hardware-accelerated transforms, I am ensuring the animation remains fluid.",
      "The visual hierarchy of the generated DOM nodes has been optimized for the Vercel edge network.",
      "Notice how the 3D perspective creates a depth-field that mimics a physical environment.",
      "I am currently writing raw styles to bypass standard component limitations.",
      "This specific iteration of the Trevor Logic Core is designed for high-fidelity GUI generation."
    ];
    
    let rant = "";
    // Generates a massive wall of text (up to 90 lines if you repeat the loop)
    for (let i = 0; i < 40; i++) {
      rant += lines[i % lines.length] + " ";
      if (i % 4 === 0) rant += "\n\n";
    }
    return rant;
  }
}
