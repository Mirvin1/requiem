import Screen from "../Screen";

export default interface Renderable {

    update(time: number): void;

    render(screen: Screen): void;
}