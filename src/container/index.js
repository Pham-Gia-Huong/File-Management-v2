import File from "../components/file";
import BreadCrumbs from "../components/breadcrumbs";
import Button from "../components/button/button";
import Folder from "../components/folder";
import GridItem from "../components/gridItem";

class Container {
  constructor(props) {
    this.props = props;
    this.breadCrumb = new BreadCrumbs({
      arrFolder: [{ id: 0, name: "abc" }, { id: 1, name: "def" }, { id: 2, name: "erg" }, { id: 3, name: "ccc" }],
      onClick: this.selectedBreadCrumb
    });
  }

  selectedBreadCrumb(e) {
    console.log(e);
  }

  renderButton() {
    let btnWrap = document.createElement("div");

    let btnNewFolder = new Button({ name: "New Folder" });
    btnWrap.appendChild(btnNewFolder.render());

    let btnMoveOut = new Button({ name: "Move Out" });
    btnWrap.appendChild(btnMoveOut.render());

    return btnWrap;
  }
  renderFolderGrid() {
    let arrNameFolder = [{ src: "fas fa-folder", name: "A" }];

    let folderGrid = new GridItem({
      arrItem: arrNameFolder,
      type: "Folder",
      title: "Folder",
      style: { fontSize: "20px", fontWeight: "bold" }
    });
    return folderGrid.render();
  }
  renderFileGrid() {
    let arrFile = [
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      },
      {
        src:
          "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/68350161_2137155336576998_2262852731632877568_o.jpg?_nc_cat=108&_nc_oc=AQlF4qUWqCW6J_fu7UVeyMxDgDjQnP3f3vSSojsF7_v4q0jXXBhlNYuQFoVlikGlIXI&_nc_ht=scontent.fsgn2-3.fna&oh=93e5b40dab8f589977ac4cb7bfe9389b&oe=5DEAD441",
        name: "Word"
      }
    ];
    let fileGrid = new GridItem({
      arrItem: arrFile,
      type: "File",
      title: "File",
      style: { fontSize: "20px", fontWeight: "bold" }
    });
    return fileGrid.render();
  }
  render() {
    let containerGrid = document.getElementById("layout-grid");

    containerGrid.appendChild(this.breadCrumb.render());

    let btnGrid = this.renderButton();
    containerGrid.appendChild(btnGrid);

    let folderGrid = this.renderFolderGrid();
    containerGrid.appendChild(folderGrid);

    let fileGrid = this.renderFileGrid(containerGrid);
    containerGrid.appendChild(fileGrid);
  }
}
export default Container;
