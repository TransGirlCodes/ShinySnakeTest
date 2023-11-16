box::use(
  shiny[...],
  waiter[...],
  app/view/snake[ShinySnake]
)

#' @export
ui <- function(id) {
  ns <- NS(id)
  bootstrapPage(
    useWaiter(),
    ShinySnake(ns("page_snake")),
    actionButton(ns("waiter_btn"), label = "Show Waiter!")
  )
}

#' @export
server <- function(id) {
  moduleServer(id, function(input, output, session) {
    bindEvent(observe({
      waiter_show(html = tagList(
        h1("Hi - snake"),
        ShinySnake(session$ns("waiter_snake")),
        actionButton(session$ns("loading_btn"), label = "Try me")
      ))
      Sys.sleep(10000)
      waiter_hide()
    }), input$waiter_btn)
    
    bindEvent(observe({
      message("The button in waiter screen was pressed!")
    }), input$loading_btn)
  })
}
