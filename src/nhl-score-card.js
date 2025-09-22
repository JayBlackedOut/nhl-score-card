import { LitElement, html, css } from "lit";

class NhlScoreCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You must define an entity");
    }
    this.config = {
      show_logos: true,
      show_details: true,
      ...config,
    };
  }

  getCardSize() {
    return this.config.show_details ? 3 : 2;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entityId = this.config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) {
      return html`<ha-card>Entity ${entityId} not found</ha-card>`;
    }

    const s = stateObj.state;
    const a = stateObj.attributes;

    const awayLogo = this.config.show_logos ? html`<img src="${a.away_logo}" alt="${a.away_name}" />` : "";
    const homeLogo = this.config.show_logos ? html`<img src="${a.home_logo}" alt="${a.home_name}" />` : "";

    let body;
    if (["LIVE", "CRIT", "PRE"].includes(s)) {
      body = html`
        <div class="score-line">
          <span>${a.away_score ?? "-"}</span>
          <span class="dash">–</span>
          <span>${a.home_score ?? "-"}</span>
        </div>
        <div class="game-info">
          <span>Period: ${a.current_period || ""}</span>
          <span>${a.time_remaining || ""}</span>
        </div>
        ${this.config.show_details && a.away_sog != null && a.home_sog != null
          ? html`<div class="sog">SOG: ${a.away_sog} – ${a.home_sog}</div>`
          : ""}
      `;
    } else if (["FINAL", "OVER"].includes(s)) {
      body = html`
        <div class="score-line final">
          <span>${a.away_score ?? "-"}</span>
          <span class="dash">–</span>
          <span>${a.home_score ?? "-"}</span>
        </div>
        <div class="game-info">Final</div>
      `;
    } else {
      body = html`
        <div class="game-info">
          Status: ${s}<br />
          Next: ${a.next_game_datetime || `${a.next_game_date || ""} ${a.next_game_time || ""}`}
        </div>
      `;
    }

    const footer = a.national_broadcasts
      ? html`<div class="footer">National: ${a.national_broadcasts.join(", ")}</div>`
      : "";

    return html`
      <ha-card>
        <div class="teams">
          <div class="team">
            ${awayLogo}
            <span>${a.away_name || ""}</span>
          </div>
          <div class="vs">vs</div>
          <div class="team">
            <span>${a.home_name || ""}</span>
            ${homeLogo}
          </div>
        </div>
        <div class="body">${body}</div>
        ${footer}
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .teams {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
    }
    .team {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: bold;
    }
    .team img {
      height: 32px;
    }
    .vs {
      margin: 0 12px;
      font-size: 1.2em;
      font-weight: bold;
    }
    .score-line {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .score-line.final {
      color: var(--primary-color);
    }
    .dash {
      margin: 0 6px;
    }
    .game-info {
      font-size: 0.9em;
      text-align: center;
    }
    .sog {
      font-size: 0.8em;
      margin-top: 4px;
      color: var(--secondary-text-color);
    }
    .footer {
      margin-top: 8px;
      font-size: 0.8em;
      color: var(--secondary-text-color);
    }
  `;

  static getConfigForm() {
    return {
      schema: [
        { name: "entity", required: true, selector: { entity: {} } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "show_logos", selector: { boolean: {} } },
            { name: "show_details", selector: { boolean: {} } },
          ],
        },
      ],
      assertConfig: (config) => {
        if (config.other_option) {
          throw new Error("'other_option' is unexpected.");
        }
      },
    };
  }
}

customElements.define("nhl-score-card", NhlScoreCard);
