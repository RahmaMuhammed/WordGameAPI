import { Component, OnInit } from '@angular/core';
import { WordService } from '../services/word.service';

interface FloatingLetter {
  char: string;
  left: string;
  fontSize: string;
  animationDelay: string;
}

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  timer: any;
timeLeft = 30;
 category = '';
  difficulty = '';
  categories = ['animals', 'fruits', 'countries','technology'];
  difficulties = ['easy', 'medium', 'hard'];

  originalWord = '';
  shuffledLetters: string[] = [];
  userAnswer = '';
  message = '';

  randomLetters: FloatingLetter[] = [];

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.generateFloatingLetters();
  }

  generateFloatingLetters() {
    this.randomLetters = Array.from({ length: 30 }, () => {
      return {
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        left: Math.random() * 100 + '%',
        fontSize: Math.floor(Math.random() * 24 + 12) + 'px',
        animationDelay: Math.random() * 5 + 's'
      };
    });
  }
startGame() {
  if (!this.category || !this.difficulty) {
    this.message = 'Please select both category and difficulty.';
    return;
  }

  this.wordService.getWord(this.category, this.difficulty).subscribe({
    next: (data) => {
      this.originalWord = data.word || data; // احتياطي لو الـ API بيرجع string مباشرة
      this.shuffledLetters = this.shuffle(this.originalWord.split(''));
      this.userAnswer = '';
      this.message = '';
      this.timeLeft = 30;

      clearInterval(this.timer); // في حال التايمر شغّال قبل كده
      this.startTimer();
    },
    error: (err) => {
      console.error('API error:', err);
      this.message = '❌ Failed to load word.';
    }
  });
}
startTimer() {
  this.timer = setInterval(() => {
    this.timeLeft--;

    if (this.timeLeft === 0) {
      clearInterval(this.timer);
      this.message = "⏱️ Time's up!";
      setTimeout(() => this.startGame(), 2000); // يعيد السؤال بعد ثانيتين
    }
  }, 1000);
}


  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectLetter(letter: string) {
    this.userAnswer += letter;
  }

  checkAnswer() {
  if (this.userAnswer === this.originalWord) {
    this.message = '✅ Correct!';
    clearInterval(this.timer); // أوقف العداد
  } else {
    this.message = '❌ Incorrect. Try again!';
  }
}


  reset() {
    this.userAnswer = '';
    this.message = '';
  }
}
