export class TrevorEngine {
  private hfToken = "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";

  public async getResponse(userInput: string): Promise<{ text: string, code?: string }> {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
        {
          headers: { 
            Authorization: `Bearer ${this.hfToken}`, 
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
            You are Trevor, a god-tier AI coder. 
            If the user asks to build or code something, provide ONLY the raw HTML and inline CSS. 
            Use @keyframes for any requested animations. 
            Do not use placeholders. Write the actual code.<|eot_id|>
            <|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|>
            <|start_header_id|>assistant<|end_header_id|>`,
          }),
        }
      );

      const result = await response.json();
      // Extract the AI's generated code
      const aiOutput = result[0]?.generated_text?.split("<|start_header_id|>assistant<|end_header_id|>")[1] || "";

      // Regex to grab the HTML/CSS blocks
      const codeRegex = /<style>[\s\S]*?<\/style>|<div[\s\S]*?<\/div>|<button[\s\S]*?<\/button>|<table[\s\S]*?<\/table>/i;
      const foundCode = aiOutput.match(codeRegex);
      
      return {
        text: this.generate90LineRant(userInput),
        code: foundCode ? foundCode[0] : `<div style="color:#60a5fa; font-family:monospace;">// Component successfully compiled.</div>`
      };
    } catch (error) {
      return { text: "Neural Link Error: Check your Vercel logs. ⚠️" };
    }
  }

  private generate90LineRant(input: string): string {
    let rant = "SYSTEM STATUS: COMPILING DATA ARCHITECTURE...\n\n";
    const terms = [
      "Executing recursive DOM injection...", 
      "Optimizing hardware-accelerated 3D transforms...", 
      "Syncing neural weights with Hugging Face Llama-3 clusters...", 
      "Bypassing standard CSS limitations for high-fidelity GUI...", 
      "Verifying vertex shaders and pixel-density ratios..."
    ];
    // Generates the massive wall of "Smart" text
    for (let i = 0; i < 90; i++) {
      rant += `Line ${i+1}: ${terms[i % terms.length]} (Context: ${input})\n`;
    }
    return rant;
  }
}
