import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/VerticalWithAlternateImageAndText";
import ProductGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Hero2 from "components/hero/TwoColumnWithInput";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium text-teal-400`;
  const HighlightedText = tw.span`bg-teal-400 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;

  // TODO
  // 1. Panggil component yang harusnya ada di halaman ini
  // 2. Modifikasi styling dan value property yang dimiliki component

  return (
    <AnimationRevealPage>
      <Hero2 />
      <MainFeature
        subheading={<Subheading>Wether it's casual or competitive gaming</Subheading>}
        heading={
          <>
            Guaranteed to
            <wbr /> <HighlightedText>Surpass Your Expectations</HighlightedText>
          </>
        }
        description={
        <Description>Enjoy the smooth experience of building your dream pc with our lates product
          <br />
          <br />
          All available across the globe
        </Description>}
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="Latest Offers"
        imageSrc={"https://images.unsplash.com/photo-1704871132518-94cadb901021?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
       />
      <ProductGrid />
      <MainFeature2 />
      <Testimonial />
      <Features />
      <Footer background={"bg-gray-200"} />
    </AnimationRevealPage>
  );
};
