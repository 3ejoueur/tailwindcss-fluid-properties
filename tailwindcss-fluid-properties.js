/**
--------------------------------------------------------------------------
   @name Tailwind CSS Fluid Properties
   @desc Small Tailwind CSS plugin to make CSS property sizes fluid
   @author Ian Reid Langevin @3ejoueur
--------------------------------------------------------------------------
*/

const plugin = require("tailwindcss/plugin")

module.exports = plugin(
   function ({ addUtilities, theme }) {
      // get the values in theme
      const CONFIG_ENTRIES = theme("fluidCSS")

      if (CONFIG_ENTRIES) {
         const CREATED_CLASSES = []
         Object.entries(CONFIG_ENTRIES).forEach(entry => {
            const [KEY, VALUE] = entry
            // const from value
            const PROPERTY = VALUE.prop
            const MIN_SIZE = VALUE.minSize
            const MAX_SIZE = VALUE.maxSize
            // const from value for breakpoints - Allow pixels or config screen value
            const MIN_BREAKPOINT = VALUE.minScreen.endsWith("px") ? VALUE.minScreen : theme(`screens.${VALUE.minScreen}`)
            const MAX_BREAKPOINT = VALUE.maxScreen.endsWith("px") ? VALUE.maxScreen : theme(`screens.${VALUE.maxScreen}`)
            // create the CSS output
            CREATED_CLASSES.push({
               [`.${KEY}`]: { [`${PROPERTY}`]: MIN_SIZE },
               [`@media (min-width: ${MIN_BREAKPOINT})`]: {
                  [`.${KEY}`]: {
                     [`${PROPERTY}`]: `calc(${MIN_SIZE} + ${parseFloat(MAX_SIZE) - parseFloat(MIN_SIZE)} * (100vw - ${MIN_BREAKPOINT}) / ${parseFloat(MAX_BREAKPOINT) - parseFloat(MIN_BREAKPOINT)})`
                  }
               },
               [`@media (min-width: ${MAX_BREAKPOINT})`]: {
                  [`.${KEY}`]: { [`${PROPERTY}`]: MAX_SIZE }
               }
            })
         })
         addUtilities(CREATED_CLASSES)
      }
   }

)
