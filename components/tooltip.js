class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
            <style>
                #tooltip-container {
                    font-size: 24px;
                }

                .tooltip{
                    padding: 1rem;
                    border-radius: 10px;
                    background-color: black;
                    color: white;
                }
            </style>

            <slot></slot>
            <span id="tooltip-container">👉</span>
        `;
  }

  connectedCallback() {
    this._tooltipText = this.getAttribute("tip-text") || "Default Text";
    this._tooltipContainer = this.shadowRoot.querySelector(
      "#tooltip-container"
    );

    // Add event listeners to our div element
    this._tooltipContainer.addEventListener(
      "mouseover",
      this._showTooltip.bind(this)
    );
    this._tooltipContainer.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    console.log("Ready to go 😎");
  }

  disconnectedCallback() {
    this._tooltipContainer.removeEventListener("mouseover", this._showTooltip);
    this._tooltipContainer.removeEventListener("mouseleave", this._hideTooltip);
    console.log("All clean 😊");
  }

  _showTooltip() {
    this._tooltip = document.createElement("span");
    this._tooltip.innerText = this._tooltipText;
    this._tooltip.className = "tooltip";

    this.shadowRoot.append(this._tooltip);
  }

  _hideTooltip() {
    this._tooltip.remove();
  }
}

customElements.define("example-tooltip", Tooltip);
