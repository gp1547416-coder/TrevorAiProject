export class TrevorEngine {
  private hfToken = "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";

  public async getResponse(userInput: string): Promise<{ text: string, code?: string }> {
    // Using 3.2-3B because it responds in < 3 seconds (No Vercel Timeout)
    const model = "meta-llama/Llama-3.2-3B-Instruct";
    const apiURL = `https://api-inference.huggingface.co/models/${model}`;
    
    try {
      const response = await fetch(apiURL, {
        headers: { 
          Authorization: `Bearer ${this.hfToken}`, 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>You are Trevor Pro. User wants LIVE CODE. Return ONLY a single <div> containing the object and a <style> tag for animations. No text.<|eot_id|><|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
          parameters: { max_new_tokens: 500, use_cache: false }
        }),
      });

      const result = await response.json();

      if (result.error) {
        return { text: `Neural Core Busy: ${result.error}. Try one more time! ⚠️` };
      }

      const aiOutput = result[0]?.generated_text?.split("<|start_header_id|>assistant<|end_header_id|>")[1] || "";
      
      // Better extraction to make sure code actually shows up
      const codeRegex = /<style>[\s\S]*?<\/style>[\s\S]*?<div[\s\S]*?<\/div>|<div[\s\S]*?<\/div>/i;
      const foundCode = aiOutput.match(codeRegex);
      
      return {
        text: this.generate90LineRant(userInput),
        code: foundCode ? foundCode[0] : aiOutput 
      };
    } catch (error) {
      return { text: "Link Timeout: Vercel killed the connection. Try a shorter prompt! ⚡" };
    }
  }

  private generate90LineRant(input: string): string {
    let rant = "STABLE CONNECTION ESTABLISHED... \n\n";
    for (let i = 0; i < 90; i++) {
      rant += `Neural Path ${i+1}: Finalizing high-speed render for "${input}"... [SUCCESS]\n`;
    }
    return rant;
  }
}
