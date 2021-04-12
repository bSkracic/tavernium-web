<template>
    <b-card
        :title="message.username + ':'"
    >
        <b-card-text>
            {{message.content}}
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    name: "MessageBox",
    props: {
        message: Object
    }
}
</script>