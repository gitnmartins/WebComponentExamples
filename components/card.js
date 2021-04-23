class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
            <style>
                .card {
                  max-width: 15rem;
                  height: fit-content;
                  padding: 1.5rem;
                  border-radius: 5px;
                  background-color: rgba(0,0,0, 0.5);
                  color: white;
                }

                hr {
                  width: 100%;
                  border-color: rgba(255,255,255, 0.5);
                }
            </style>

            <div class="card">
                <slot name="title"></slot>
                <hr>
                <slot name="content"></slot>
                <hr>
                <slot name="footer"></slot>
                <slot name="alt" hidden>
            </div>
        `;
  }

  connectedCallback() {
    this._card = this.shadowRoot.querySelector(".card");
    this._slots = this.shadowRoot.querySelectorAll("slot");
    this._cardHeight = this._card.style.height;
    console.log(this._cardHeight);

    // Slot content
    this._storedContent = [];
    this._slots.forEach((slot) => {
      this._storedContent.push(slot);
    });
    console.log(this._storedContent);

    this._card.addEventListener("mouseover", this._rotateCard.bind(this));
    this._card.addEventListener("mouseleave", this._returnCard.bind(this));
  }

  _rotateCard() {
    // this._card.style.height = this._cardHeight;
    let slot;
    this._storedContent.forEach((element) => {
      if (element.name === "alt") {
        this._card.appendChild(element);
      }
    });
    console.log(slot);
    // this._card.innerHTML = slot;
    this._card.appendChild(slot);
  }

  _returnCard() {
    this._card.innerHTML = "";
    this._storedContent.forEach((element, index) => {
      if (element.name === "alt") return;
      if (index > 0 && index < this._storedContent.length) {
        this._card.appendChild(document.createElement("hr"));
      }
      this._card.appendChild(element);
    });
    // this._card.innerHTML = this._storedContent;
  }
}

customElements.define("example-card", Card);
