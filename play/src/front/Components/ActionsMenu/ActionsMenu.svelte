<script lang="ts">
    import type { Unsubscriber } from "svelte/store";
    import { onDestroy } from "svelte";
    import { actionsMenuStore } from "../../Stores/ActionsMenuStore";

    import type { ActionsMenuAction, ActionsMenuData } from "../../Stores/ActionsMenuStore";

    let actionsMenuData: ActionsMenuData | undefined;
    let sortedActions: ActionsMenuAction[] | undefined;

    let actionsMenuStoreUnsubscriber: Unsubscriber | null;

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            closeActionsMenu();
        }
    }

    function closeActionsMenu() {
        actionsMenuStore.clear();
    }

    actionsMenuStoreUnsubscriber = actionsMenuStore.subscribe((value) => {
        actionsMenuData = value;
        if (actionsMenuData) {
            sortedActions = [...actionsMenuData.actions.values()].sort((a, b) => {
                const ap = a.priority ?? 0;
                const bp = b.priority ?? 0;
                if (ap > bp) {
                    return -1;
                }
                if (ap < bp) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    });

    onDestroy(() => {
        if (actionsMenuStoreUnsubscriber) {
            actionsMenuStoreUnsubscriber();
        }
    });
</script>

<svelte:window on:keydown={onKeyDown} />

{#if actionsMenuData}
    <div class="actions-menu nes-container is-rounded">
        <button type="button" class="nes-btn is-error close" on:click={closeActionsMenu}>&times;</button>
        <h2 class="name">{actionsMenuData.menuName}</h2>
        <div class="actions">
            {#each sortedActions ?? [] as action}
                <button
                    type="button"
                    class="nes-btn {action.style ?? ''}"
                    on:click|preventDefault={() => {
                        action.callback();
                    }}
                >
                    {action.actionName}
                </button>
            {/each}
        </div>
    </div>
{/if}

<style lang="scss">
    .actions-menu {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        width: 260px !important;
        height: max-content !important;
        max-height: 50vh;
        margin-top: 200px;
        z-index: 425;

        pointer-events: auto;
        font-family: "Press Start 2P";
        background-color: #333333;
        color: whitesmoke;

        .actions {
            max-height: 30vh;
            width: 100%;
            display: block;
            overflow-x: hidden;
            overflow-y: auto;

            button {
                width: calc(100% - 10px);
                margin-bottom: 10px;
            }
        }

        .name {
            max-height: 15vh;
        }

        .actions::-webkit-scrollbar {
            display: none;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            font-family: "Press Start 2P";
        }

        .nes-btn.is-error.close {
            position: absolute;
            top: -20px;
            right: -20px;
        }
    }
</style>
