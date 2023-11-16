box::use(
  shiny[...]
)

#' @export
ShinySnake <- function (id) {
  addResourcePath("shinysnake", box::file("javascript"))
  
  tagList(
    singleton(
      tags$head(
        tags$script(src = "shinysnake/snake.js", type = "text/javascript"),
        tags$script(src = "shinysnake/ShinySnakeBinding.js", type = "text/javascript")
      )
    ),
    
    tags$canvas(
      id = id,
      width = 400,
      height = 400,
      style = "width: 400px; height: 400px; border: 1px solid white;",
      class = "ShinySnake"
    )
  )
}