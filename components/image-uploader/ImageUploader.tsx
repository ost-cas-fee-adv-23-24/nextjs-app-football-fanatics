import React from 'react';
import {
  EParagraphSizes,
  Paragraph,
} from '@ost-cas-fee-adv-23-24/elbmum-design';

interface IProps {}

const ImageUploader = ({}: IProps) => {
  return (
    <div className="">
      <Paragraph
        size={EParagraphSizes.LARGE}
        text="Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? Artoo! Artoo-Detoo, where are you? At last! Where have you been? They're heading in this direction."
      />
      <hr className="mb-4 mt-4" />
      <Paragraph
        size={EParagraphSizes.LARGE}
        text="An analysis of the plans provided by Princess Leia has demonstrated a weakness in the battle station. The approach will not be easy. You are required to maneuver straight down this trench and skim the surface to this point. The target area is only two meters wide. It's a small thermal exhaust port, right below the main port. The shaft leads directly to the reactor system."
      />
      <hr className="mb-4 mt-4" />
      <Paragraph
        size={EParagraphSizes.LARGE}
        text="He betrayed and murdered your father. Now the Jedi are all but extinct. Vader was seduced by the dark side of the Force. The Force? Well, the Force is what gives a Jedi his power. It's an energy field created by all living things."
      />
      <hr className="mb-4 mt-4" />
      <Paragraph
        size={EParagraphSizes.LARGE}
        text="No, I don't think he likes you at all. No, I don't like you either. You know, I think that R2 unit we bought might have been stolen. What makes you think that? Well, I stumbled across a recording while I was cleaning him."
      />
    </div>
  );
};

export default ImageUploader;
