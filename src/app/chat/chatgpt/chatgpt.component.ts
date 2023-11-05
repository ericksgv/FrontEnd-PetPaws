import { Component } from '@angular/core';
import { ChatgptService } from '../services/chatgpt.service';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.css']
})
export class ChatgptComponent {
  message!:string;
  chatHistory: { question: string; answer: string }[] = [];
  constructor(private chatgptSvc:ChatgptService){}


  sendMessage() {
    console.log('Historial antes de agregar pregunta:', this.chatHistory);
    this.chatgptSvc.getDataFromOpenAI(this.message);
    this.chatHistory = this.chatgptSvc.getChatHistory();
    console.log('Historial después de agregar pregunta:', this.chatHistory);
    this.message = '';
  }
  
  

  getChatHistory() {
    this.chatHistory = this.chatgptSvc.getChatHistory();
  }

  limpiar(){

    location.reload();

  }

}
