import { v2, Vec2 } from "../../../../../client/assets/Bundles/Code/Logic/Module/Math/vec2";
import { Entity } from "../../../../../client/assets/Scripts/Core/Entity/Entity";

interface Node {
    point: Vec2;
    parent?: Node;
    g: number;
    h: number;
    f: number;
}

export class PathfindingComponent extends Entity {
    private allowDiagonal: boolean = true
    private width: number
    private height: number
    private nodes: Node[][]

    find(start: Vec2, end: Vec2): Vec2[] {
        const openSet: Node[] = [];
        const closedSet: Node[] = [];
        const startNode: Node = {
            point: start,
            g: 0,
            h: this.heuristic(start, end),
            f: 0,
        };

        openSet.push(startNode);

        while (openSet.length > 0) {
            let currentNode: Node = openSet[0];
            let currentIndex: number = 0;

            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < currentNode.f) {
                    currentNode = openSet[i];
                    currentIndex = i;
                }
            }

            openSet.splice(currentIndex, 1);
            closedSet.push(currentNode);

            if (currentNode.point.x === end.x && currentNode.point.y === end.y) {
                return this.getPath(currentNode);
            }

            const neighbors: Node[] = this.getNeighbors(currentNode);

            for (let i = 0; i < neighbors.length; i++) {
                const neighbor: Node = neighbors[i];

                if (closedSet.some((node) => node.point.x === neighbor.point.x && node.point.y === neighbor.point.y)) {
                    continue;
                }

                const tentativeGScore: number = currentNode.g + this.distance(currentNode.point, neighbor.point);

                if (!openSet.some((node) => node.point.x === neighbor.point.x && node.point.y === neighbor.point.y)) {
                    openSet.push(neighbor);
                } else if (tentativeGScore >= neighbor.g) {
                    continue;
                }

                neighbor.parent = currentNode;
                neighbor.g = tentativeGScore;
                neighbor.h = this.heuristic(neighbor.point, end);
                neighbor.f = neighbor.g + neighbor.h;
            }
        }

        // If we've exhausted all possible paths and haven't returned a path yet, it means
        // that the end point is unreachable. In this case, we search outward for the nearest
        // reachable point.
        const maxSearchDepth = Math.max(this.width, this.height);
        let currentDepth = 1;
        while (currentDepth <= maxSearchDepth) {
            const newOpenSet: Node[] = [];
            for (let i = 0; i < closedSet.length; i++) {
                const currentNode = closedSet[i];
                const neighbors = this.getNeighbors(currentNode);
                for (let j = 0; j < neighbors.length; j++) {
                    const neighbor = neighbors[j];
                    if (closedSet.some((node) => node.point.x === neighbor.point.x && node.point.y === neighbor.point.y)) {
                        continue;
                    }
                }
                if (newOpenSet.length > 0) {
                    // We've found a reachable point, so we return the path to it.
                    const nearestNode = newOpenSet.sort((a, b) => a.f - b.f)[0];
                    return this.getPath(nearestNode);
                }
                currentDepth++;
                // Move the closed set to the open set for the next iteration
                closedSet.push(...newOpenSet);
                openSet.length = 0;
                openSet.push(...newOpenSet);
            }

        }

        // We didn't find a reachable point, so we return an empty path.
        return [];
    }

    private getPath(node: Node): Vec2[] {
        const path: Vec2[] = [];
        let currentNode: Node | undefined = node;

        while (currentNode) {
            path.unshift(currentNode.point);
            currentNode = currentNode.parent;
        }

        return path;
    }

    private distance(a: Vec2, b: Vec2): number {
        const dx: number = a.x - b.x;
        const dy: number = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
    }
    private heuristic(a: Vec2, b: Vec2): number {
        const dx: number = Math.abs(a.x - b.x);
        const dy: number = Math.abs(a.y - b.y);

        return dx + dy;
    }

    private getNeighbors(node: Node): Node[] {
        const neighbors: Node[] = [];
        const { x, y } = node.point;

        if (x > 0 && this.nodes[x - 1][y]) {
            neighbors.push({
                point: v2(x - 1, y),
                g: 0,
                h: 0,
                f: 0,
            });
        }

        if (x < this.width - 1 && this.nodes[x + 1][y]) {
            neighbors.push({
                point: v2(x + 1, y),
                g: 0,
                h: 0,
                f: 0,
            });
        }

        if (y > 0 && this.nodes[x][y - 1]) {
            neighbors.push({
                point: v2(x, y - 1),
                g: 0,
                h: 0,
                f: 0,
            });
        }

        if (y < this.height - 1 && this.nodes[x][y + 1]) {
            neighbors.push({
                point: v2(x, y + 1),
                g: 0,
                h: 0,
                f: 0,
            });
        }

        if (this.allowDiagonal) {
            // Check diagonal neighbors
            if (x > 0 && y > 0 && this.nodes[x - 1][y - 1]) {
                neighbors.push({
                    point: v2(x - 1, y - 1),
                    g: 0,
                    h: 0,
                    f: 0,
                });
            }
            if (x > 0 && y < this.height - 1 && this.nodes[x - 1][y + 1]) {
                neighbors.push({
                    point: v2(x - 1, y + 1),
                    g: 0,
                    h: 0,
                    f: 0,
                });
            }
            if (x < this.width - 1 && y > 0 && this.nodes[x + 1][y - 1]) {
                neighbors.push({
                    point: v2(x + 1, y - 1),
                    g: 0,
                    h: 0,
                    f: 0,
                });
            }
            if (x < this.width - 1 && y < this.height - 1 && this.nodes[x + 1][y + 1]) {
                neighbors.push({
                    point: v2(x + 1, y + 1),
                    g: 0,
                    h: 0,
                    f: 0,
                });
            }
        }

        return neighbors;
    }
}