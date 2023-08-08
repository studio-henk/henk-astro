CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        '/',
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others', groups: [ 'others' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'about', groups: [ 'about' ] }
    ];

    config.removeButtons = 'Find,Underline,Subscript,Superscript,Maximize,SpecialChar,HorizontalRule,Table,Image,Link,Unlink,Anchor,Scayt,Undo,Redo,Cut,Copy,Paste,PasteText,PasteFromWord,Bold,Italic,Strike,RemoveFormat,NumberedList,Outdent,Blockquote,Indent,BulletedList,Styles,About,Format,Font,FontSize,TextColor,BGColor,ShowBlocks,JustifyCenter,Iframe,CreateDiv,JustifyBlock,JustifyLeft,JustifyRight';
    config.removePlugins = 'pagebreak';
};