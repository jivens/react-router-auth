import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

export default function AudioAccordion() {
  return (
      <Accordion allowZeroExpanded>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                    Introduction
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <span>Below are several audio recordings of Coeur d'Alene.  The audios for Cricket Rides Coyote, Little Mosquito, and Rabbit and Jackrabbit are also available in the <Link to="/texts">texts</Link> area of this site, where they appear with the fieldnotes and published English translations that are associated with them.</span>
              </AccordionItemPanel>
          </AccordionItem>
      </Accordion>
  );
}
