import { withDesign } from "storybook-addon-designs";
import TransactionLayout from "../../pages/layout/TransactionLayout";
import design from "../assets/App.png";
import { RESOLUTIONS, generateStory } from "../_tools/StoryFactory";

export default {
  title: "App/Transaction",
  component: TransactionLayout,
  decorators: [withDesign],
  args: { inStory: true },
  parameters: {
    design: {
      type: "image",
      url: design,
      scale: 0.5,
    },
  },
};

export const M = generateStory(RESOLUTIONS.MediumDesktop);
export const L = generateStory(RESOLUTIONS.LargeDesktop);
export const XL = generateStory(RESOLUTIONS.ExtraLargeDesktop);
export const S = generateStory(RESOLUTIONS.SmallDesktop);
export const TabletLandscape = generateStory(RESOLUTIONS.TabletLandscape);
export const TabletPortrait = generateStory(RESOLUTIONS.TabletPortrait);
