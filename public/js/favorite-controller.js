const bookmarkButtons = document.getElementsByClassName("favorite-button")

const onButtonEnter = (mouseEnter) => {
    const button = mouseEnter.target

    if (button.favorited) {
        return
    }

    const image = button.querySelector("img")
    image.setAttribute("src", "/images/site/bookmark_add.png")
}

const onButtonLeave = (mouseLeave) => {
    const button = mouseLeave.target
    
    if (button.favorited) {
        return
    }

    const image = button.querySelector("img")
    image.setAttribute("src", "/images/site/bookmark.png")
}

const onButtonClick = async (click) => {
    button = click.target
    button.disabled = true
    const response = await fetch(`/favorite/update/${ click.target.value }`, { method: "PUT" })
    button.disabled = false
    
    if (response.ok) {
        const message = await response.json()
        if (message.code == 201) {
            button.favorited = true
            button.title = "Click To Unfavorite"

            const image = button.querySelector("img") 
            image.setAttribute("src", "/images/site/bookmark_added.png")
        } else {
            button.favorited = false
            button.title = "Click To Favorite"

            const image = button.querySelector("img") 
            image.setAttribute("src", "/images/site/bookmark.png")
        }
    }
}

const initializeButton = async (button) => {
    const response = await fetch(`/favorite/status/${ button.value }`)
    if (!response.ok) {
        return
    }
    
    const data = await response.json()
    const isFavorited = data.isFavorited == 1

    if (!isFavorited) {
        return
    }

    button.favorited = true
    button.title = "Click To Unfavorite"

    const image = button.querySelector("img") 
    image.setAttribute("src", "/images/site/bookmark_added.png")
}

for (const button of bookmarkButtons) {
    button.addEventListener("mouseenter", onButtonEnter)
    button.addEventListener("mouseleave", onButtonLeave)
    button.addEventListener("click", onButtonClick)
    button.title = "Click To Favorite"
    // console.log(`/favorite/status/${ button.value }`)

    initializeButton(button)
}