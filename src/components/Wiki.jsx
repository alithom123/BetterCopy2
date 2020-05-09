import React from "react";
/* 
data:
batchcomplete: ""
query:
pages:
736:
extract: "Albert Einstein ( EYEN-styne; German: [ˈalbɛʁt ˈʔaɪnʃtaɪn] (listen); 14 March 1879 – 18 April 1955) was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics (alongside quantum mechanics). His work is also known for its influence on the philosophy of science. He is best known to the general public for his mass–energy equivalence formula ↵  ↵    ↵      ↵        E↵        =↵        m↵        ↵          c↵          ↵            2↵          ↵        ↵      ↵    ↵    {\displaystyle E=mc^{2}}↵  , which has been dubbed "the world's most famous equation". He received the 1921 Nobel Prize in Physics "for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect", a pivotal step in the development of quantum theory.↵The son of a salesman who later operated an electrochemical factory, Einstein was born in the German Empire but moved to Switzerland in 1895 and renounced his German citizenship in 1896. Specializing in physics and mathematics, he received his academic teaching diploma from the Swiss Federal Polytechnic School (German: eidgenössische polytechnische Schule, later ETH) in Zürich in 1900. The following year, he acquired Swiss citizenship, which he kept for his entire life. After initially struggling to find work, from 1902 to 1909 he was employed as a patent examiner at the Swiss Patent Office in Bern.↵Near the beginning of his career, Einstein thought that Newtonian mechanics was no longer enough to reconcile the laws of classical mechanics with the laws of the electromagnetic field. This led him to develop his special theory of relativity during his time at the Swiss Patent Office. In 1905, called his annus mirabilis (miracle year), he published four groundbreaking papers, which attracted the attention of the academic world; the first outlined the theory of the photoelectric effect, the second paper explained Brownian motion, the third paper introduced special relativity, and the fourth mass-energy equivalence. That year, at the age of 26, he was awarded a PhD by the University of Zurich.↵Although initially treated with skepticism from many in the scientific community, Einstein's works gradually came to be recognised as significant advancements. He was invited to teach theoretical physics at the University of Bern in 1908 and the following year moved to the University of Zurich, then in 1911 to Charles University in Prague before returning to the Federal Polytechnic School in Zürich in 1912. In 1914, he was elected to the Prussian Academy of Sciences in Berlin, where he remained for 19 years. Soon after publishing his work on special relativity, Einstein began working to extend the theory to gravitational fields; he then published a paper on general relativity in 1916, introducing his theory of gravitation. He continued to deal with problems of statistical mechanics and quantum theory, which led to his explanations of particle theory and the motion of molecules. He also investigated the thermal properties of light and the quantum theory of radiation, the basis of laser, which laid the foundation of the photon theory of light. In 1917, he applied the general theory of relativity to model the structure of the universe.In 1933, while Einstein was visiting the United States, Adolf Hitler came to power. Because of his Jewish background, Einstein did not return to Germany. He settled in the United States and became an American citizen in 1940. On the eve of World War II, he endorsed a letter to President Franklin D. Roosevelt alerting FDR to the potential development of "extremely powerful bombs of a new type" and recommending that the US begin similar research. This eventually led to the Manhattan Project. Einstein supported the Allies, but he generally denounced the idea of using nuclear fission as a weapon. He signed the Russell–Einstein Manifesto with British philosopher Bertrand Russell, which highlighted the danger of nuclear weapons. He was affiliated with the Institute for Advanced Study in Princeton, New Jersey, until his death in 1955.↵He published more than 300 scientific papers and more than 150 non-scientific works. His intellectual achievements and originality have made the word "Einstein" synonymous with "genius". Eugene Wigner compared him to his contemporaries, writing that "Einstein's understanding was deeper even than Jancsi von Neumann's. His mind was both more penetrating and more original".↵↵"
ns: 0
pageid: 736
title: "Albert Einstein"
*/

function Wiki({ wiki }) {
  //   function logMapElements(value, key, map) {
  //     console.log(`m[${key}] = ${value}`);
  //   }

  //   console.log(`the wiki im getting in Wiki component is`, wiki.query.pages);
  //   wiki.query.pages.forEach(logMapElements);
  return (
    <div>
      <div>
        {Object.entries(wiki.query.pages).map(
          ([wikiPageNum, { extract, title }]) => (
            <div key={wikiPageNum}>
              <p>
                <span>extract: {extract}</span>
              </p>
              <p>
                <span>title: {title}</span>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Wiki;
