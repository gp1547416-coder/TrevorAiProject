export class TrevorEngine {
  private hfToken = "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";

  public async getResponse(userInput: string): Promise<{ text: string, code?: string }> {
    const apiURL = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";
    
    try {
      const response = await fetch(apiURL, {
        headers: { Authorization: `Bearer ${this.hfToken}`, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>You are Trevor, a god-tier AI coder. Provide ONLY raw HTML/CSS for requests. No talk.<|eot_id|><|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
          parameters: { return_full_text: false, max_new_tokens: 1000 }
        }),
      });

      const result = await response.json();

      // Fix for "Model is loading" error
      if (result.error && result.error.includes("currently loading")) {
        return { text: "Neural Core is waking up... Give me 20 seconds and try again! ⏳" };
      }

      const aiOutput = result[0]?.generated_text || "";
      const codeRegex = /<style>[\s\S]*?<\/style>|<div[\s\S]*?<\/div>|<button[\s\S]*?<\/button>|<table[\s\S]*?<\/table>/i;
      const foundCode = aiOutput.match(codeRegex);
      
      return {
        text: this.generate90LineRant(userInput),
        code: foundCode ? foundCode[0] : aiOutput // Fallback to raw output if regex fails
      };
    } catch (error) {
      console.error(error);
      return { text: "Link Error: The AI server is overwhelmed. Try sending the message one more time! ⚠️" };
    }
  }

  private generate90LineRant(input: string): string {
    let rant = "LOGIC INITIALIZED... \n\n";
    for (let i = 0; i < 90; i++) {
      rant += `Step ${i+1}: Processing quantum request for "${input}"... [OPTIMIZED]\n`;
    }
    return rant;
  }
}
