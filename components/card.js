class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
            <style>
            .flip-card {
              background-color: transparent;
              width: 300px;
              height: 300px;
              perspective: 1000px;
            }
            
            .flip-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              text-align: center;
              transition: transform 0.6s;
              transform-style: preserve-3d;
              box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            }
            
            .flip-card:hover .flip-card-inner {
              transform: rotateY(180deg);
            }
            
            .flip-card-front, .flip-card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
            }
            
            .flip-card-front {
              background-color: rgba(255,255,255);
              color: black;
            }
            
            .flip-card-back {
              background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
              color: white;
              transform: rotateY(180deg);
            }
            </style>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <slot name="main" />
                </div>
                <div class="flip-card-back">
                  <slot name="flip" />
                </div>
              </div>
            </div>
        `;
  }
}

customElements.define("example-card", Card);
