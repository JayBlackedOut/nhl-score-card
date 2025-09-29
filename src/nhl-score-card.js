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
      throw new Error("You must define an entity (e.g. sensor.nhl_mtl).");
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

    const away = {
      name: a.away_name || "Away",
      logo: a.away_logo || null,
      score: a.away_score ?? "-",
      sog: a.away_sog ?? "-",
    };
    const home = {
      name: a.home_name || "Home",
      logo: a.home_logo || null,
      score: a.home_score ?? "-",
      sog: a.home_sog ?? "-",
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
          <div class="status-label live-label">${a.current_period ? `${a.current_period}${a.current_period === 1 ? "ST" : a.current_period === 2 ? "ND" : a.current_period === 3 ? "RD" : ""}` : ""}${a.is_intermission === "true" ? `${a.is_intermission}` : ""} ${a.time_remaining ? `• ${a.time_remaining}` : ""}</div>

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
          <div class="status-label final-label">FINAL</div>

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
    const nextDt = [a.next_game_date, a.next_game_time].filter(Boolean).join(", ");
    return html`
      <ha-card class="card scheduled">
        <div class="status-label final-label">${nextDt || "No game scheduled"}</div>
          <div class="teams">
            <div class="team-row">
              <div class="sched-left">
                ${away.logo ? html`<img class="logo" src="${away.logo}" alt="${away.name} logo" />` : html``}
                <div class="meta-left">
                  <div class="team-name">${away.name}</div>
                </div>
              </div>
            </div>

            <div class="team-row">
              <div class="sched-left">
                ${home.logo ? html`<img class="logo" src="${home.logo}" alt="${home.name} logo" />` : html``}
                <div class="meta-left">
                  <div class="team-name">${home.name}</div>
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

      .sched-left {
        display: flex;
        align-items: center;
        gap: 2px;
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
        font-weight: 600;
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
