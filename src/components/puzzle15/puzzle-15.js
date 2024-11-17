/** @prettier */

import { html, css, LitElement } from "lit";
import { Puzzle15Model } from "./puzzle-15-model.js";
import confetti from "canvas-confetti";

/**
 * Implementation of the Puzzle 15.
 */
export class Puzzle15 extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
        font-size: 16px;
      }
      .button {
        font-size: 20px;
        min-width: 11.8rem;
      }
      .square {
        height: 6rem;
        width: 6rem;
        font-size: 28px;
        border-radius: 5px;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      @media screen and (max-width: 640px) {
        .button {
          font-size: 20px;
          min-width: 9rem;
        }
        .square {
          height: 4.5rem;
          width: 4.5rem;
          font-size: 28px;
          border-radius: 5px;
          text-align: center;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
          -webkit-appearance: none;
        }
      }
      .empty {
        color: #00000000;
        background-color: #00000000;
      }
    `;
  }

  static get properties() {
    return {
      model: { type: Object },
    };
  }

  constructor() {
    super();
    this.model = new Puzzle15Model(16);

    this.audio = new Audio("/tom3.wav");
    this.audio.addEventListener("ended", () => {
      console.log("Audio playback has ended");
      // Perform any actions you want when the audio ends
    });
  }

  newGrid(gridJson) {
    this.model.fromJson(gridJson);
    this.requestUpdate();
  }

  showPuzzle = () => {
    const { size } = this.model;
    let rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(this.showRow(i));
    }
    return html`<div>${rows}</div>`;
  };

  showRow(rowIdx) {
    const { size } = this.model;
    let row = this.model.grid.slice(rowIdx * size, (rowIdx + 1) * size);

    return html`<div>
      ${row.map((value, idx) => this.squareButton(value, rowIdx * size + idx))}
    </div>`;
  }

  render() {
    return html`
      <div>
        <div>${this.showPuzzle()}</div>
        <br />
        ${this.newGameButton()} ${this.solvedButton()}
      </div>
      <br />
    `;
  }

  // id defines the position in grid
  // value displayed is the value of the square
  squareButton = (value, position) => {
    let empty = value == this.model.grid.length;
    return html`<button
      id="${position}"
      class=${empty ? "empty square" : "square"}
      @click="${this._onClickSquare}"
    >
      ${value}
    </button>`;
  };

  newGameButton() {
    return html`<button
      @click=${this._onClickNewGame}
      class="button"
      ?disabled=${!this.model.isSolved()}
    >
      Mélange!
    </button>`;
  }

  solvedButton() {
    let distance = this.model.totalDistance();
    let steps = this.model.steps;
    return html`<button class="button">
      <!-- ${this.model.isSolved()
        ? `Résolu en ${steps}!`
        : `${distance} : ${steps}`} -->
      ${this.solvedButtonText()}
    </button>`;
  }

  solvedButtonText() {
    // if distance == 0 then
    //    if steps == 0 then "Résolu!"
    //    else "Résolu (steps)!"
    // else
    //    "distance : steps"
    let distance = this.model.totalDistance();
    let steps = this.model.steps;

    if (this.model.isSolved()) {
      if (steps == 0) {
        return "Résolu!";
      } else {
        return `Résolu en ${steps}!`;
      }
    } else {
      return `${distance} : ${steps}`;
    }
  }
  _onClickSquare(e) {
    console.log(`_onClick2`, e.target.id);
    let moved = this.model.move(parseInt(e.target.id));
    if (moved) {
      this.audio.play();
      this.requestUpdate();
      if (this.model.isSolved()) {
        this.confetti();
      }
    }
  }

  _onClickNewGame(e) {
    console.log(`_onClick`, e);
    this.model.scramble(200);
    this.requestUpdate();
  }

  // // for development only
  // _onClickTest = (event) => {
  //   console.log(event.target);
  //   for (_ of this.model.grid) {
  //     this.model.randomMove();
  //     console.log(`model: ${this.model.grid}`);
  //     this.requestUpdate();
  //   }
  // };

  confetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
    });
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
customElements.define("puzzle-15", Puzzle15);
