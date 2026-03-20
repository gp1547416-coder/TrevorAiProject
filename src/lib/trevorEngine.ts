export class TrevorEngine {
  private hfToken = "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";

  public async getResponse(userInput: string): Promise<{ text: string, code?: string }> {
    const model = "meta-llama/Meta-Llama-3-8B-Instruct";
    const apiURL = `https://api-inference.huggingface.co/models/${model}`;
    
    // Attempt the connection up to 3 times
    for (let i = 0; i < 3; i++) {
      try {
        const response = await fetch(apiURL, {
          headers: { Authorization: `Bearer ${this.hfToken}`, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>You are Trevor, a god-tier AI coder. Provide ONLY raw HTML/CSS for requests. No talk.<|eot_id|><|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
          }),
        });

        const result = await response.json();

        // Check if the model is still loading/waking up
        if (result.error && result.estimated_time) {
          console.log(`Model is waking up... waiting ${Math.round(result.estimated_time)}s`);
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
          continue; 
        }

        const aiOutput = result[0]?.generated_text?.split("<|start_header_id|>assistant<|end_header_id|>")[1] || "";
        const codeRegex = /<style>[\s\S]*?<\/style>|<div[\s\S]*?<\/div>|<button[\s\S]*?<\/button>|<table[\s\S]*?<\/table>/i;
        const foundCode = aiOutput.match(codeRegex);
        
        return {
          text: this.generate90LineRant(userInput),
          code: foundCode ? foundCode[0] : aiOutput 
        };
      } catch (error) {
        if (i === 2) return { text: "Neural Link timed out. The AI server is too busy right now. Try again in 1 minute! ⚠️" };
      }
    }
    return { text: "Unknown error in the matrix. 🤖" };
  }

  private generate90LineRant(input: string): string {
    let rant = "ANALYZING CORE DATA... \n\n";
    for (let i = 0; i < 90; i++) {
      rant += `Neural Stream ${i+1}: Synthesizing 3D structures for "${input}"... Done.\n`;
    }
    return rant;
  }
}
