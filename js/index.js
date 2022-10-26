// tsParticles
// https://github.com/matteobruni/tsparticles
import { ExternalInteractorBase, tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const customPushName = "ws-push",
  defaultQuantity = 4,
  minQuantity = 1,
  maxQuantity = 5;

export class WsPusher extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    this.quantity = defaultQuantity;

    this.handleClickMode = (mode) => {
      if (mode !== customPushName) {
        return;
      }

      const container = this.container;

      const pushNb = this.quantity;

      if (pushNb <= 0) {
        return;
      }

      container.particles.push(pushNb, container.interactivity.mouse);

      this.quantity = Math.round(
        Math.random() * (maxQuantity - minQuantity) + minQuantity
      );
    };
  }

  clear() {
    // do nothing
  }

  init() {
    // do nothing
  }

  async interact() {
    // do nothing
  }

  isEnabled() {
    return true;
  }

  reset() {
    // do nothing
  }
}

(async () => {
  await tsParticles.addInteractor(
    "externalWsPush",
    (container) => new WsPusher(container)
  );

  await loadSlim(tsParticles);

  await tsParticles.load({
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: customPushName
        }
      }
    },
    particles: {
      color: {
        value: "#fff"
      },
      links: {
        enable: true,
        color: "#000"
      },
      number: {
        value: 0,
        density: {
          enable: false
        }
      },
      move: {
        enable: true,
        outModes: "destroy"
      }
    }
  });
})();
