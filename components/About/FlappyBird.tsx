import { useEffect, useRef, useState } from "react";

import { Button } from "@/shadcn/button";

interface Pipe {
    x: number;
    y: number;
}

// Source: https://github.com/aaarafat/JS-Flappy-Bird/tree/master
function FlappyBird() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isMutedRef = useRef(false);

    useEffect(() => {
        const scrn = canvasRef.current;
        if (!scrn) return;

        const sctx = scrn.getContext("2d");
        if (!sctx) return;

        const RAD = Math.PI / 180;
        let frames = 0;
        const dx = 2;

        const state = {
            curr: 0,
            getReady: 0,
            Play: 1,
            gameOver: 2,
        };

        const SFX = {
            start: new Audio("sfx/start.wav"),
            flap: new Audio("sfx/flap.wav"),
            score: new Audio("sfx/score.wav"),
            hit: new Audio("sfx/hit.wav"),
            die: new Audio("sfx/die.wav"),
            played: false,
            playSound(audio: HTMLAudioElement) {
                if (!isMutedRef.current) {
                    audio.play().catch(() => {});
                }
            },
        };

        // Mute button
        const muteBtn = {
            x: scrn.width - 40,
            y: 10,
            size: 30,
            draw() {
                // Button background
                sctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                sctx.beginPath();
                sctx.roundRect(this.x, this.y, this.size, this.size, 5);
                sctx.fill();

                // Icon
                sctx.strokeStyle = "#FFFFFF";
                sctx.fillStyle = "#FFFFFF";
                sctx.lineWidth = 2;
                sctx.lineCap = "round";
                sctx.lineJoin = "round";

                const cx = this.x + this.size / 2;
                const cy = this.y + this.size / 2;

                if (isMutedRef.current) {
                    // Muted icon (speaker with X)
                    sctx.beginPath();
                    sctx.moveTo(cx - 8, cy - 4);
                    sctx.lineTo(cx - 4, cy - 4);
                    sctx.lineTo(cx + 2, cy - 8);
                    sctx.lineTo(cx + 2, cy + 8);
                    sctx.lineTo(cx - 4, cy + 4);
                    sctx.lineTo(cx - 8, cy + 4);
                    sctx.closePath();
                    sctx.fill();

                    // X mark
                    sctx.beginPath();
                    sctx.moveTo(cx + 4, cy - 4);
                    sctx.lineTo(cx + 8, cy + 4);
                    sctx.moveTo(cx + 8, cy - 4);
                    sctx.lineTo(cx + 4, cy + 4);
                    sctx.stroke();
                } else {
                    // Unmuted icon (speaker with waves)
                    sctx.beginPath();
                    sctx.moveTo(cx - 8, cy - 4);
                    sctx.lineTo(cx - 4, cy - 4);
                    sctx.lineTo(cx + 2, cy - 8);
                    sctx.lineTo(cx + 2, cy + 8);
                    sctx.lineTo(cx - 4, cy + 4);
                    sctx.lineTo(cx - 8, cy + 4);
                    sctx.closePath();
                    sctx.fill();

                    // Sound waves
                    sctx.beginPath();
                    sctx.arc(cx + 2, cy, 5, -Math.PI / 4, Math.PI / 4);
                    sctx.stroke();
                    sctx.beginPath();
                    sctx.arc(cx + 2, cy, 8, -Math.PI / 4, Math.PI / 4);
                    sctx.stroke();
                }
            },
            isClicked(x: number, y: number) {
                return (
                    x >= this.x &&
                    x <= this.x + this.size &&
                    y >= this.y &&
                    y <= this.y + this.size
                );
            },
        };

        const gnd = {
            sprite: new Image(),
            x: 0,
            y: 0,
            draw() {
                this.y = scrn.height - this.sprite.height;
                sctx.drawImage(this.sprite, this.x, this.y);
            },
            update() {
                if (state.curr !== state.Play) return;
                this.x -= dx;
                this.x = this.x % (this.sprite.width / 2);
            },
        };

        const bg = {
            sprite: new Image(),
            x: 0,
            y: 0,
            draw() {
                const y = scrn.height - this.sprite.height;
                sctx.drawImage(this.sprite, this.x, y);
            },
        };

        const pipe = {
            top: { sprite: new Image() },
            bot: { sprite: new Image() },
            gap: 85,
            moved: true,
            pipes: [] as Pipe[],
            draw() {
                for (const p of this.pipes) {
                    sctx.drawImage(this.top.sprite, p.x, p.y);
                    sctx.drawImage(
                        this.bot.sprite,
                        p.x,
                        p.y + this.top.sprite.height + this.gap
                    );
                }
            },
            update() {
                if (state.curr !== state.Play) return;
                if (frames % 100 === 0) {
                    this.pipes.push({
                        x: scrn.width,
                        y: -210 * Math.min(Math.random() + 1, 1.8),
                    });
                }
                for (const p of this.pipes) {
                    p.x -= dx;
                }

                if (
                    this.pipes.length &&
                    this.pipes[0].x < -this.top.sprite.width
                ) {
                    this.pipes.shift();
                    this.moved = true;
                }
            },
        };

        const bird = {
            animations: [
                { sprite: new Image() },
                { sprite: new Image() },
                { sprite: new Image() },
                { sprite: new Image() },
            ],
            rotation: 0,
            x: 50,
            y: 100,
            speed: 0,
            gravity: 0.125,
            thrust: 3.6,
            frame: 0,
            draw() {
                const h = this.animations[this.frame].sprite.height;
                const w = this.animations[this.frame].sprite.width;
                sctx.save();
                sctx.translate(this.x, this.y);
                sctx.rotate(this.rotation * RAD);
                sctx.drawImage(
                    this.animations[this.frame].sprite,
                    -w / 2,
                    -h / 2
                );
                sctx.restore();
            },
            update() {
                const r = this.animations[0].sprite.width / 2;
                switch (state.curr) {
                    case state.getReady:
                        this.rotation = 0;
                        this.y +=
                            frames % 10 === 0 ? Math.sin(frames * RAD) : 0;
                        this.frame += frames % 10 === 0 ? 1 : 0;
                        break;
                    case state.Play:
                        this.frame += frames % 5 === 0 ? 1 : 0;
                        this.y += this.speed;
                        this.setRotation();
                        this.speed += this.gravity;
                        if (this.y + r >= gnd.y || this.checkCollision()) {
                            state.curr = state.gameOver;
                        }
                        break;
                    case state.gameOver:
                        this.frame = 1;
                        if (this.y + r < gnd.y) {
                            this.y += this.speed;
                            this.setRotation();
                            this.speed += this.gravity * 2;
                        } else {
                            this.speed = 0;
                            this.y = gnd.y - r;
                            this.rotation = 90;
                            if (!SFX.played) {
                                SFX.playSound(SFX.die);
                                SFX.played = true;
                            }
                        }
                        break;
                }
                this.frame = this.frame % this.animations.length;
            },
            flap() {
                if (this.y > 0) {
                    SFX.playSound(SFX.flap);
                    this.speed = -this.thrust;
                }
            },
            setRotation() {
                if (this.speed <= 0) {
                    this.rotation = Math.max(
                        -25,
                        (-25 * this.speed) / (-1 * this.thrust)
                    );
                } else {
                    this.rotation = Math.min(
                        90,
                        (90 * this.speed) / (this.thrust * 2)
                    );
                }
            },
            checkCollision() {
                if (!pipe.pipes.length) return false;
                const birdSprite = this.animations[0].sprite;
                const x = pipe.pipes[0].x;
                const y = pipe.pipes[0].y;
                const r = birdSprite.height / 4 + birdSprite.width / 4;
                const roof = y + pipe.top.sprite.height;
                const floor = roof + pipe.gap;
                const w = pipe.top.sprite.width;
                if (this.x + r >= x) {
                    if (this.x + r < x + w) {
                        if (this.y - r <= roof || this.y + r >= floor) {
                            SFX.playSound(SFX.hit);
                            return true;
                        }
                    } else if (pipe.moved) {
                        UI.score.curr++;
                        SFX.playSound(SFX.score);
                        pipe.moved = false;
                    }
                }
                return false;
            },
        };

        const UI = {
            getReady: { sprite: new Image() },
            gameOver: { sprite: new Image() },
            tap: [{ sprite: new Image() }, { sprite: new Image() }],
            score: {
                curr: 0,
                best: 0,
            },
            x: 0,
            y: 0,
            tx: 0,
            ty: 0,
            frame: 0,
            draw() {
                switch (state.curr) {
                    case state.getReady:
                        this.y =
                            (scrn.height - this.getReady.sprite.height) / 2;
                        this.x = (scrn.width - this.getReady.sprite.width) / 2;
                        this.tx = (scrn.width - this.tap[0].sprite.width) / 2;
                        this.ty =
                            this.y +
                            this.getReady.sprite.height -
                            this.tap[0].sprite.height;
                        sctx.drawImage(this.getReady.sprite, this.x, this.y);
                        sctx.drawImage(
                            this.tap[this.frame].sprite,
                            this.tx,
                            this.ty
                        );
                        break;
                    case state.gameOver:
                        this.y =
                            (scrn.height - this.gameOver.sprite.height) / 2;
                        this.x = (scrn.width - this.gameOver.sprite.width) / 2;
                        this.tx = (scrn.width - this.tap[0].sprite.width) / 2;
                        this.ty =
                            this.y +
                            this.gameOver.sprite.height -
                            this.tap[0].sprite.height;
                        sctx.drawImage(this.gameOver.sprite, this.x, this.y);
                        sctx.drawImage(
                            this.tap[this.frame].sprite,
                            this.tx,
                            this.ty
                        );
                        break;
                }
                this.drawScore();
            },
            drawScore() {
                sctx.fillStyle = "#FFFFFF";
                sctx.strokeStyle = "#000000";
                switch (state.curr) {
                    case state.Play:
                        sctx.lineWidth = 2;
                        sctx.font = "20px 'Albert Sans', sans-serif";
                        sctx.fillText(
                            this.score.curr.toString(),
                            scrn.width / 2 - 5,
                            50
                        );
                        sctx.strokeText(
                            this.score.curr.toString(),
                            scrn.width / 2 - 5,
                            50
                        );
                        break;
                    case state.gameOver:
                        sctx.lineWidth = 1.5;
                        sctx.font = "16px 'Albert Sans', sans-serif";
                        const sc = `SCORE :     ${this.score.curr}`;
                        this.score.best = Math.max(
                            this.score.curr,
                            this.score.best
                        );
                        const bs = `BEST    :     ${this.score.best}`;

                        sctx.fillText(sc, scrn.width / 2 - 80, scrn.height / 2);
                        sctx.strokeText(
                            sc,
                            scrn.width / 2 - 80,
                            scrn.height / 2
                        );
                        sctx.fillText(
                            bs,
                            scrn.width / 2 - 80,
                            scrn.height / 2 + 30
                        );
                        sctx.strokeText(
                            bs,
                            scrn.width / 2 - 80,
                            scrn.height / 2 + 30
                        );
                        break;
                }
            },
            update() {
                if (state.curr === state.Play) return;
                this.frame += frames % 10 === 0 ? 1 : 0;
                this.frame = this.frame % this.tap.length;
            },
        };

        // Load images
        gnd.sprite.src = "img/ground.png";
        bg.sprite.src = "img/BG.png";
        pipe.top.sprite.src = "img/toppipe.png";
        pipe.bot.sprite.src = "img/botpipe.png";
        UI.gameOver.sprite.src = "img/go.png";
        UI.getReady.sprite.src = "img/getready.png";
        UI.tap[0].sprite.src = "img/tap/t0.png";
        UI.tap[1].sprite.src = "img/tap/t1.png";
        bird.animations[0].sprite.src = "img/bird/b0.png";
        bird.animations[1].sprite.src = "img/bird/b1.png";
        bird.animations[2].sprite.src = "img/bird/b2.png";
        bird.animations[3].sprite.src = "img/bird/b0.png";

        const resetGame = () => {
            state.curr = state.getReady;
            bird.speed = 0;
            bird.y = 100;
            pipe.pipes = [];
            UI.score.curr = 0;
            SFX.played = false;
        };

        const handleClick = (e: MouseEvent) => {
            const rect = scrn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check if mute button was clicked
            if (muteBtn.isClicked(x, y)) {
                isMutedRef.current = !isMutedRef.current;
                return;
            }

            // Handle game clicks
            switch (state.curr) {
                case state.getReady:
                    state.curr = state.Play;
                    SFX.playSound(SFX.start);
                    break;
                case state.Play:
                    bird.flap();
                    break;
                case state.gameOver:
                    resetGame();
                    break;
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === " " ||
                e.key === "w" ||
                e.key === "W" ||
                e.key === "ArrowUp"
            ) {
                e.preventDefault();
                switch (state.curr) {
                    case state.getReady:
                        state.curr = state.Play;
                        SFX.playSound(SFX.start);
                        break;
                    case state.Play:
                        bird.flap();
                        break;
                    case state.gameOver:
                        resetGame();
                        break;
                }
            }
        };

        const update = () => {
            bird.update();
            gnd.update();
            pipe.update();
            UI.update();
        };

        const draw = () => {
            sctx.fillStyle = "#30c0df";
            sctx.fillRect(0, 0, scrn.width, scrn.height);
            bg.draw();
            pipe.draw();
            bird.draw();
            gnd.draw();
            UI.draw();
            muteBtn.draw();
        };

        const gameLoop = () => {
            update();
            draw();
            frames++;
        };

        const interval = setInterval(gameLoop, 20);
        scrn.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(interval);
            scrn.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="canvas"
            width={276}
            height={414}
            className="cursor-pointer border-2 border-white"
            tabIndex={1}
        />
    );
}

export function TriggerFlappyBird() {
    const [isPlaying, setIsPlaying] = useState(false);

    if (isPlaying) {
        return (
            <div>
                <FlappyBird />
                <p className="mt-2 text-sm text-accent/80">
                    Tap or press Spacebar to begin
                </p>
            </div>
        );
    }

    return (
        <Button
            className="p-0 text-white"
            variant="link"
            onPointerUp={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
            }}
        >
            Click here to play Flappy Bird
        </Button>
    );
}
