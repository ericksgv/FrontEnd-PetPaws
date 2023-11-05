import { Injectable } from '@angular/core';
import { filter, from, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Configuration, OpenAIApi } from 'openai';

const APIKEY = environment.apiKey;

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor() { }
  private chatHistory: { question: string; answer: string }[] = [];
  readonly configuration = new Configuration({
    apiKey: APIKEY
  });

  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAI(text: string) {
    // Obtén la información de la empresa desde el servicio

  
    // Combina la información de la empresa con la pregunta
    const preguntaConInfo = `puedo proporcionar una respuesta que comunique seguridad y explique los pasos a seguir cuando un dueño de perro se enfrenta a una situación de emergencia. Aquí tienes una respuesta que se adhiere al contexto proporcionado:

    "¡Tranquilo! En PetPaws, estamos contigo en cada paso del camino cuando se trata de la salud de tu perro. Si tu peludo amigo se enferma, te recomendamos seguir estos pasos:
    
    Llámanos de inmediato: Comunícate con nuestra clínica al +57 301 282 8295 o +57 340 212 9812. Nuestro equipo altamente capacitado está disponible las 24 horas, los 7 días de la semana.
    
    Explícanos los síntomas: Describe los síntomas o el problema de tu perro con detalle. Esto nos ayudará a entender la situación y brindarte la mejor atención.
    
    Sigue nuestras indicaciones: Nuestro personal te guiará sobre qué hacer antes de traer a tu perro a la clínica o mientras te dirigimos a nosotros.
    
    En PetPaws, nuestra prioridad es el bienestar de tu perro. Siempre puedes contar con nosotros para brindar atención experta y compasiva en cualquier situación de emergencia."
    
    Teniendo en cuenta el contexto proporcionado, responda a la pregunta: ${text}`;
  
    from(this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: preguntaConInfo, // Usa la pregunta con información de la empresa
      max_tokens: 256,
      temperature: 0.7
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => (
        data.choices && data.choices.length > 0 && data.choices[0].text
      )),
      map(data => data.choices[0].text)
    ).subscribe(data => {
      const question = text;
      const answer = data;
  
      // Agrega la pregunta y respuesta al historial
      this.addToChatHistory(question, answer);
  
      console.log('Pregunta:', question);
      console.log('Respuesta:', answer);
    });
  }
  
  
  addToChatHistory(question: string, answer: string) {
    const exists = this.chatHistory.some(chat => chat.question === question);
  
    if (!exists) {
      this.chatHistory.push({ question, answer });
      console.log('Historial después de agregar:', this.chatHistory);
    }
  }
  
  getChatHistory() {
    return this.chatHistory;
  }
}

