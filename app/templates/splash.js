const splashTemplate = () => {
  return `<div class="splash-content">
      <h1>Southeast Conservation Adaptation Strategy Story Map</h1>
      <p>The Southeast Conservation Adaptation Strategy (SECAS) is a shared, long-term vision for the conservation future of the Southeast and Caribbean region of the United States. Through SECAS, diverse partners are working together to design and achieve a connected network of landscapes and seascapes that supports thriving fish and wildlife populations and improved quality of life for people. By stitching together smaller subregional plans into a Conservation Blueprint for the Southeast, SECAS helps coordinate the efforts of federal, state, non-profit, and private organizations to prioritize conservation action and investment. This story map highlights how conservation professionals across the Southeast are using the Blueprint to bring in new funding, identify organizational priorities, and inform decision-making. It also emphasizes how other unique, cross-boundary products of SECAS are making a real difference on the ground. Collaborative success stories like these are helping make the SECAS vision a reality.</p>
      <form>
        <input type="checkbox" class="dont-show-again" name="not-again" id="not-again" />
        <label for="not-again">Do not show this message again</label>
      </form>
    </div>`;
}

module.exports = splashTemplate;
