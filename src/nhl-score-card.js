// /config/www/nhl-score-card.js
import { LitElement, html, css } from "lit";

class NhlScoreCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("You must define an entity.");
    }
    this.config = config;
  }

  getCardSize() {
    return 3;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entityId = this.config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) {
      return html`<ha-card>Unknown entity: ${entityId}</ha-card>`;
    }

    const st = String(stateObj.state || "").toUpperCase();
    const a = stateObj.attributes || {};
    const isDark = this.hass.themes?.darkMode;

    const away = {
      name: a.away_name || "Away",
      logo: isDark ? (a.away_logo_dark || a.away_logo) : (a.away_logo || null),
      score: a.away_score ?? "-",
      sog: a.away_sog ?? "-",
      record: a.away_record || "",
    };
    const home = {
      name: a.home_name || "Home",
      logo: isDark ? (a.home_logo_dark || a.home_logo) : (a.home_logo || null),
      score: a.home_score ?? "-",
      sog: a.home_sog ?? "-",
      record: a.home_record || "",
    };

    const broadcasts = []
      .concat(a.away_broadcasts || [])
      .concat(a.home_broadcasts || [])
      .concat(a.national_broadcasts || [])
      .filter(Boolean);

    const isLive = st === "LIVE" || st === "CRIT";
    const isFinal = st === "FINAL" || st === "OFF" || st === "OVER";
    const isScheduled = !isLive && !isFinal;

    if (isLive) {
      return html`
        <ha-card class="card live">
          <div class="status-label ${a.is_intermission ? "intermission-label" : "live-label"}">
            ${a.current_period 
              ? (a.current_period === 1 
                ? "1ST" 
                : a.current_period === 2 
                  ? "2ND" 
                  : a.current_period === 3 
                    ? "3RD" 
                    : a.current_period_type) 
              : ""} 
            ${a.is_intermission ? " INT" : ""} 
            ${a.time_remaining ? `• ${a.time_remaining}` : ""}
          </div>

          <div class="teams">
            <!-- AWAY row -->
            <div class="team-row">
              <div class="left">
                ${away.logo
                  ? html`<img class="logo" src="${away.logo}" alt="${away.name} logo" />`
                  : html`<div class="logo placeholder"></div>`}
                <div class="meta-left">
                  <div class="team-name">${away.name}</div>
                  <div class="team-sub">SOG: ${away.sog}</div>
                </div>
              </div>
              <div class="score">${away.score}</div>
            </div>

            <!-- HOME row -->
            <div class="team-row">
              <div class="left">
                ${home.logo
                  ? html`<img class="logo" src="${home.logo}" alt="${home.name} logo" />`
                  : html`<div class="logo placeholder"></div>`}
                <div class="meta-left">
                  <div class="team-name">${home.name}</div>
                  <div class="team-sub">SOG: ${home.sog}</div>
                </div>
              </div>
              <div class="score">${home.score}</div>
            </div>
          </div>

          <div class="bottom">
            ${broadcasts.length ? html`<div class="broadcasts">${broadcasts.join(" • ")}</div>` : ""}
          </div>
        </ha-card>
      `;
    }

    if (isFinal) {
      return html`
        <ha-card class="card final">
          <div class="status-label final-label">FINAL${a.current_period_type === "REG" ? "" : `/${a.current_period_type}`}</div>

          <div class="teams">
            <div class="team-row">
              <div class="left">
                ${away.logo ? html`<img class="logo" src="${away.logo}" alt="${away.name} logo" />` : html``}
                <div class="meta-left">
                  <div class="team-name">${away.name}</div>
                  <div class="team-sub">SOG: ${away.sog}</div>
                </div>
              </div>
              <div class="score">${away.score}</div>
            </div>

            <div class="team-row">
              <div class="left">
                ${home.logo ? html`<img class="logo" src="${home.logo}" alt="${home.name} logo" />` : html``}
                <div class="meta-left">
                  <div class="team-name">${home.name}</div>
                  <div class="team-sub">SOG: ${home.sog}</div>
                </div>
              </div>
              <div class="score">${home.score}</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    // scheduled / upcoming
    if (isScheduled) {
    const nextDt = st === "PRE" ? "PRE-GAME" : st;
    return html`
      <ha-card class="card scheduled">
        <div class="status-label final-label">${nextDt || "NO GAME SCHEDULED"}</div>
          <div class="teams">
            <div class="team-row">
              <div class="left">
                ${away.logo ? html`<img class="logo" src="${away.logo}" alt="${away.name} logo" />` : html``}
                <div class="meta-left">
                  <div class="team-name">${away.name}</div>
                  <div class="team-sub">(${away.record})</div>
                </div>
              </div>
            </div>

            <div class="team-row">
              <div class="left">
                ${home.logo ? html`<img class="logo" src="${home.logo}" alt="${home.name} logo" />` : html``}
                <div class="meta-left">
                  <div class="team-name">${home.name}</div>
                  <div class="team-sub">(${home.record})</div>
                </div>
              </div>
            </div>
          </div>
        ${broadcasts.length ? html`<div class="bottom">${broadcasts.join(" • ")}</div>` : ""}
      </ha-card>
    `;
    }
  }

  static get styles() {
    return css`
      :host { display: block; }
      ha-card.card {
        padding: 10px 14px;
        box-sizing: border-box;
        text-align: left;
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        position: relative;
      }

      .status-label {
        position: absolute;
        top: 6px;
        left: 10px;
        font-size: 12px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
        color: white;
      }
      .live-label { background: #118010; }
      .intermission-label { background: #4474a0; }
      .final-label { background: #555; }

      .teams { 
        display: flex; 
        flex-direction: column;
        gap: 2px;
        margin-top: 20px;
      }

      .team-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 2px;
      }

      .left {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .logo {
        width: 48px;
        height: 48px;
        object-fit: contain;
      }

      .meta-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .team-name {
        font-size: 14px;
        font-weight: 400;
      }

      .team-sub {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
      }

      .score {
        font-size: 36px;
        font-weight: 700;
        line-height: 1;
        color: var(--primary-text-color, #111);
        width: 70px;
        text-align: right;
      }

      .bottom {
        margin-top: 4px;
        text-align: center;
        font-size: 10px;
        color: var(--secondary-text-color, #666);
      }
    `;
  }
}

customElements.define("nhl-score-card", NhlScoreCard);
