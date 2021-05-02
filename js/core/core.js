// find for 
//		Binary.ab162str
//		JsExpression 
//	as next section


if("define" in window) { 
	define.amd = false;
}


// load esprima as part of parsing in super.

(function webpackUniversalModuleDefinition(root, factory) {
	/* istanbul ignore next */
		if(typeof exports === 'object' && typeof module === 'object')
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
	/* istanbul ignore next */
		else if(typeof exports === 'object')
			exports["esprima"] = factory();
		else
			root["esprima"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/* istanbul ignore if */
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		/*
		  Copyright JS Foundation and other contributors, https://js.foundation/
	
		  Redistribution and use in source and binary forms, with or without
		  modification, are permitted provided that the following conditions are met:
	
			* Redistributions of source code must retain the above copyright
			  notice, this list of conditions and the following disclaimer.
			* Redistributions in binary form must reproduce the above copyright
			  notice, this list of conditions and the following disclaimer in the
			  documentation and/or other materials provided with the distribution.
	
		  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
		  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
		  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
		  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
		  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
		  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
		  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
		  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
		Object.defineProperty(exports, "__esModule", { value: true });
		var comment_handler_1 = __webpack_require__(1);
		var jsx_parser_1 = __webpack_require__(3);
		var parser_1 = __webpack_require__(8);
		var tokenizer_1 = __webpack_require__(15);
		var Node = __webpack_require__(7);
		
		function parse(code, options, delegate) {
			var commentHandler = null;
			var proxyDelegate = function (node, metadata) {
				if (delegate) {
					delegate(node, metadata);
				}
				if (commentHandler) {
					commentHandler.visit(node, metadata);
				}
			};
			var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
			var collectComment = false;
			if (options) {
				collectComment = (typeof options.comment === 'boolean' && options.comment);
				var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
				if (collectComment || attachComment) {
					commentHandler = new comment_handler_1.CommentHandler();
					commentHandler.attach = attachComment;
					options.comment = true;
					parserDelegate = proxyDelegate;
				}
			}
			var isModule = false;
			if (options && typeof options.sourceType === 'string') {
				isModule = (options.sourceType === 'module');
			}
			var parser;
			if (options && typeof options.jsx === 'boolean' && options.jsx) {
				parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
			}
			else {
				parser = new parser_1.Parser(code, options, parserDelegate);
			}
			var program = isModule ? parser.parseModule() : parser.parseScript();
			var ast = program;
			if (collectComment && commentHandler) {
				ast.comments = commentHandler.comments;
			}
			if (parser.config.tokens) {
				ast.tokens = parser.tokens;
			}
			if (parser.config.tolerant) {
				ast.errors = parser.errorHandler.errors;
			}
			return ast;
		}
		exports.parse = parse;
		exports.Node = Node;
		exports.JSXParser = jsx_parser_1.JSXParser;
		exports.Parser = parser_1.Parser;
		
		function parseModule(code, options, delegate) {
			var parsingOptions = options || {};
			parsingOptions.sourceType = 'module';
			return parse(code, parsingOptions, delegate);
		}
		exports.parseModule = parseModule;
		function parseScript(code, options, delegate) {
			var parsingOptions = options || {};
			parsingOptions.sourceType = 'script';
			return parse(code, parsingOptions, delegate);
		}
		exports.parseScript = parseScript;
		function tokenize(code, options, delegate) {
			var tokenizer = new tokenizer_1.Tokenizer(code, options);
			var tokens;
			tokens = [];
			try {
				while (true) {
					var token = tokenizer.getNextToken();
					if (!token) {
						break;
					}
					if (delegate) {
						token = delegate(token);
					}
					tokens.push(token);
				}
			}
			catch (e) {
				tokenizer.errorHandler.tolerate(e);
			}
			if (tokenizer.errorHandler.tolerant) {
				tokens.errors = tokenizer.errors();
			}
			return tokens;
		}
		exports.tokenize = tokenize;
		var syntax_1 = __webpack_require__(2);
		exports.Syntax = syntax_1.Syntax;
		// Sync with *.json manifests.
		exports.version = '4.0.1';
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var syntax_1 = __webpack_require__(2);
		var CommentHandler = (function () {
			function CommentHandler() {
				this.attach = false;
				this.comments = [];
				this.stack = [];
				this.leading = [];
				this.trailing = [];
			}
			CommentHandler.prototype.insertInnerComments = function (node, metadata) {
				//  innnerComments for properties empty block
				//  `function a() {/** comments **\/}`
				if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
					var innerComments = [];
					for (var i = this.leading.length - 1; i >= 0; --i) {
						var entry = this.leading[i];
						if (metadata.end.offset >= entry.start) {
							innerComments.unshift(entry.comment);
							this.leading.splice(i, 1);
							this.trailing.splice(i, 1);
						}
					}
					if (innerComments.length) {
						node.innerComments = innerComments;
					}
				}
			};
			CommentHandler.prototype.findTrailingComments = function (metadata) {
				var trailingComments = [];
				if (this.trailing.length > 0) {
					for (var i = this.trailing.length - 1; i >= 0; --i) {
						var entry_1 = this.trailing[i];
						if (entry_1.start >= metadata.end.offset) {
							trailingComments.unshift(entry_1.comment);
						}
					}
					this.trailing.length = 0;
					return trailingComments;
				}
				var entry = this.stack[this.stack.length - 1];
				if (entry && entry.node.trailingComments) {
					var firstComment = entry.node.trailingComments[0];
					if (firstComment && firstComment.range[0] >= metadata.end.offset) {
						trailingComments = entry.node.trailingComments;
						delete entry.node.trailingComments;
					}
				}
				return trailingComments;
			};
			CommentHandler.prototype.findLeadingComments = function (metadata) {
				var leadingComments = [];
				var target;
				while (this.stack.length > 0) {
					var entry = this.stack[this.stack.length - 1];
					if (entry && entry.start >= metadata.start.offset) {
						target = entry.node;
						this.stack.pop();
					}
					else {
						break;
					}
				}
				if (target) {
					var count = target.leadingComments ? target.leadingComments.length : 0;
					for (var i = count - 1; i >= 0; --i) {
						var comment = target.leadingComments[i];
						if (comment.range[1] <= metadata.start.offset) {
							leadingComments.unshift(comment);
							target.leadingComments.splice(i, 1);
						}
					}
					if (target.leadingComments && target.leadingComments.length === 0) {
						delete target.leadingComments;
					}
					return leadingComments;
				}
				for (var i = this.leading.length - 1; i >= 0; --i) {
					var entry = this.leading[i];
					if (entry.start <= metadata.start.offset) {
						leadingComments.unshift(entry.comment);
						this.leading.splice(i, 1);
					}
				}
				return leadingComments;
			};
			CommentHandler.prototype.visitNode = function (node, metadata) {
				if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
					return;
				}
				this.insertInnerComments(node, metadata);
				var trailingComments = this.findTrailingComments(metadata);
				var leadingComments = this.findLeadingComments(metadata);
				if (leadingComments.length > 0) {
					node.leadingComments = leadingComments;
				}
				if (trailingComments.length > 0) {
					node.trailingComments = trailingComments;
				}
				this.stack.push({
					node: node,
					start: metadata.start.offset
				});
			};
			CommentHandler.prototype.visitComment = function (node, metadata) {
				var type = (node.type[0] === 'L') ? 'Line' : 'Block';
				var comment = {
					type: type,
					value: node.value
				};
				if (node.range) {
					comment.range = node.range;
				}
				if (node.loc) {
					comment.loc = node.loc;
				}
				this.comments.push(comment);
				if (this.attach) {
					var entry = {
						comment: {
							type: type,
							value: node.value,
							range: [metadata.start.offset, metadata.end.offset]
						},
						start: metadata.start.offset
					};
					if (node.loc) {
						entry.comment.loc = node.loc;
					}
					node.type = type;
					this.leading.push(entry);
					this.trailing.push(entry);
				}
			};
			CommentHandler.prototype.visit = function (node, metadata) {
				if (node.type === 'LineComment') {
					this.visitComment(node, metadata);
				}
				else if (node.type === 'BlockComment') {
					this.visitComment(node, metadata);
				}
				else if (this.attach) {
					this.visitNode(node, metadata);
				}
			};
			return CommentHandler;
		}());
		exports.CommentHandler = CommentHandler;
	
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Syntax = {
			AssignmentExpression: 'AssignmentExpression',
			AssignmentPattern: 'AssignmentPattern',
			ArrayExpression: 'ArrayExpression',
			ArrayPattern: 'ArrayPattern',
			ArrowFunctionExpression: 'ArrowFunctionExpression',
			AwaitExpression: 'AwaitExpression',
			BlockStatement: 'BlockStatement',
			BinaryExpression: 'BinaryExpression',
			BreakStatement: 'BreakStatement',
			CallExpression: 'CallExpression',
			CatchClause: 'CatchClause',
			ClassBody: 'ClassBody',
			ClassDeclaration: 'ClassDeclaration',
			ClassExpression: 'ClassExpression',
			ConditionalExpression: 'ConditionalExpression',
			ContinueStatement: 'ContinueStatement',
			DoWhileStatement: 'DoWhileStatement',
			DebuggerStatement: 'DebuggerStatement',
			EmptyStatement: 'EmptyStatement',
			ExportAllDeclaration: 'ExportAllDeclaration',
			ExportDefaultDeclaration: 'ExportDefaultDeclaration',
			ExportNamedDeclaration: 'ExportNamedDeclaration',
			ExportSpecifier: 'ExportSpecifier',
			ExpressionStatement: 'ExpressionStatement',
			ForStatement: 'ForStatement',
			ForOfStatement: 'ForOfStatement',
			ForInStatement: 'ForInStatement',
			FunctionDeclaration: 'FunctionDeclaration',
			FunctionExpression: 'FunctionExpression',
			Identifier: 'Identifier',
			IfStatement: 'IfStatement',
			ImportDeclaration: 'ImportDeclaration',
			ImportDefaultSpecifier: 'ImportDefaultSpecifier',
			ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
			ImportSpecifier: 'ImportSpecifier',
			Literal: 'Literal',
			LabeledStatement: 'LabeledStatement',
			LogicalExpression: 'LogicalExpression',
			MemberExpression: 'MemberExpression',
			MetaProperty: 'MetaProperty',
			MethodDefinition: 'MethodDefinition',
			NewExpression: 'NewExpression',
			ObjectExpression: 'ObjectExpression',
			ObjectPattern: 'ObjectPattern',
			Program: 'Program',
			Property: 'Property',
			RestElement: 'RestElement',
			ReturnStatement: 'ReturnStatement',
			SequenceExpression: 'SequenceExpression',
			SpreadElement: 'SpreadElement',
			Super: 'Super',
			SwitchCase: 'SwitchCase',
			SwitchStatement: 'SwitchStatement',
			TaggedTemplateExpression: 'TaggedTemplateExpression',
			TemplateElement: 'TemplateElement',
			TemplateLiteral: 'TemplateLiteral',
			ThisExpression: 'ThisExpression',
			ThrowStatement: 'ThrowStatement',
			TryStatement: 'TryStatement',
			UnaryExpression: 'UnaryExpression',
			UpdateExpression: 'UpdateExpression',
			VariableDeclaration: 'VariableDeclaration',
			VariableDeclarator: 'VariableDeclarator',
			WhileStatement: 'WhileStatement',
			WithStatement: 'WithStatement',
			YieldExpression: 'YieldExpression'
		};
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	/* istanbul ignore next */
		var __extends = (this && this.__extends) || (function () {
			var extendStatics = Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
				function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			return function (d, b) {
				extendStatics(d, b);
				function __() { this.constructor = d; }
				d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			};
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var character_1 = __webpack_require__(4);
		var JSXNode = __webpack_require__(5);
		var jsx_syntax_1 = __webpack_require__(6);
		var Node = __webpack_require__(7);
		var parser_1 = __webpack_require__(8);
		var token_1 = __webpack_require__(13);
		var xhtml_entities_1 = __webpack_require__(14);
		token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
		token_1.TokenName[101 /* Text */] = 'JSXText';
		// Fully qualified element name, e.g. <svg:path> returns "svg:path"
		function getQualifiedElementName(elementName) {
			var qualifiedName;
			switch (elementName.type) {
				case jsx_syntax_1.JSXSyntax.JSXIdentifier:
					var id = elementName;
					qualifiedName = id.name;
					break;
				case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
					var ns = elementName;
					qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
						getQualifiedElementName(ns.name);
					break;
				case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
					var expr = elementName;
					qualifiedName = getQualifiedElementName(expr.object) + '.' +
						getQualifiedElementName(expr.property);
					break;
				/* istanbul ignore next */
				default:
					break;
			}
			return qualifiedName;
		}
		var JSXParser = (function (_super) {
			__extends(JSXParser, _super);
			function JSXParser(code, options, delegate) {
				return _super.call(this, code, options, delegate) || this;
			}
			JSXParser.prototype.parsePrimaryExpression = function () {
				return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
			};
			JSXParser.prototype.startJSX = function () {
				// Unwind the scanner before the lookahead token.
				this.scanner.index = this.startMarker.index;
				this.scanner.lineNumber = this.startMarker.line;
				this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
			};
			JSXParser.prototype.finishJSX = function () {
				// Prime the next lookahead.
				this.nextToken();
			};
			JSXParser.prototype.reenterJSX = function () {
				this.startJSX();
				this.expectJSX('}');
				// Pop the closing '}' added from the lookahead.
				if (this.config.tokens) {
					this.tokens.pop();
				}
			};
			JSXParser.prototype.createJSXNode = function () {
				this.collectComments();
				return {
					index: this.scanner.index,
					line: this.scanner.lineNumber,
					column: this.scanner.index - this.scanner.lineStart
				};
			};
			JSXParser.prototype.createJSXChildNode = function () {
				return {
					index: this.scanner.index,
					line: this.scanner.lineNumber,
					column: this.scanner.index - this.scanner.lineStart
				};
			};
			JSXParser.prototype.scanXHTMLEntity = function (quote) {
				var result = '&';
				var valid = true;
				var terminated = false;
				var numeric = false;
				var hex = false;
				while (!this.scanner.eof() && valid && !terminated) {
					var ch = this.scanner.source[this.scanner.index];
					if (ch === quote) {
						break;
					}
					terminated = (ch === ';');
					result += ch;
					++this.scanner.index;
					if (!terminated) {
						switch (result.length) {
							case 2:
								// e.g. '&#123;'
								numeric = (ch === '#');
								break;
							case 3:
								if (numeric) {
									// e.g. '&#x41;'
									hex = (ch === 'x');
									valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
									numeric = numeric && !hex;
								}
								break;
							default:
								valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
								valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
								break;
						}
					}
				}
				if (valid && terminated && result.length > 2) {
					// e.g. '&#x41;' becomes just '#x41'
					var str = result.substr(1, result.length - 2);
					if (numeric && str.length > 1) {
						result = String.fromCharCode(parseInt(str.substr(1), 10));
					}
					else if (hex && str.length > 2) {
						result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
					}
					else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
						result = xhtml_entities_1.XHTMLEntities[str];
					}
				}
				return result;
			};
			// Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
			JSXParser.prototype.lexJSX = function () {
				var cp = this.scanner.source.charCodeAt(this.scanner.index);
				// < > / : = { }
				if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
					var value = this.scanner.source[this.scanner.index++];
					return {
						type: 7 /* Punctuator */,
						value: value,
						lineNumber: this.scanner.lineNumber,
						lineStart: this.scanner.lineStart,
						start: this.scanner.index - 1,
						end: this.scanner.index
					};
				}
				// " '
				if (cp === 34 || cp === 39) {
					var start = this.scanner.index;
					var quote = this.scanner.source[this.scanner.index++];
					var str = '';
					while (!this.scanner.eof()) {
						var ch = this.scanner.source[this.scanner.index++];
						if (ch === quote) {
							break;
						}
						else if (ch === '&') {
							str += this.scanXHTMLEntity(quote);
						}
						else {
							str += ch;
						}
					}
					return {
						type: 8 /* StringLiteral */,
						value: str,
						lineNumber: this.scanner.lineNumber,
						lineStart: this.scanner.lineStart,
						start: start,
						end: this.scanner.index
					};
				}
				// ... or .
				if (cp === 46) {
					var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
					var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
					var value = (n1 === 46 && n2 === 46) ? '...' : '.';
					var start = this.scanner.index;
					this.scanner.index += value.length;
					return {
						type: 7 /* Punctuator */,
						value: value,
						lineNumber: this.scanner.lineNumber,
						lineStart: this.scanner.lineStart,
						start: start,
						end: this.scanner.index
					};
				}
				// `
				if (cp === 96) {
					// Only placeholder, since it will be rescanned as a real assignment expression.
					return {
						type: 10 /* Template */,
						value: '',
						lineNumber: this.scanner.lineNumber,
						lineStart: this.scanner.lineStart,
						start: this.scanner.index,
						end: this.scanner.index
					};
				}
				// Identifer can not contain backslash (char code 92).
				if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
					var start = this.scanner.index;
					++this.scanner.index;
					while (!this.scanner.eof()) {
						var ch = this.scanner.source.charCodeAt(this.scanner.index);
						if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
							++this.scanner.index;
						}
						else if (ch === 45) {
							// Hyphen (char code 45) can be part of an identifier.
							++this.scanner.index;
						}
						else {
							break;
						}
					}
					var id = this.scanner.source.slice(start, this.scanner.index);
					return {
						type: 100 /* Identifier */,
						value: id,
						lineNumber: this.scanner.lineNumber,
						lineStart: this.scanner.lineStart,
						start: start,
						end: this.scanner.index
					};
				}
				return this.scanner.lex();
			};
			JSXParser.prototype.nextJSXToken = function () {
				this.collectComments();
				this.startMarker.index = this.scanner.index;
				this.startMarker.line = this.scanner.lineNumber;
				this.startMarker.column = this.scanner.index - this.scanner.lineStart;
				var token = this.lexJSX();
				this.lastMarker.index = this.scanner.index;
				this.lastMarker.line = this.scanner.lineNumber;
				this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
				if (this.config.tokens) {
					this.tokens.push(this.convertToken(token));
				}
				return token;
			};
			JSXParser.prototype.nextJSXText = function () {
				this.startMarker.index = this.scanner.index;
				this.startMarker.line = this.scanner.lineNumber;
				this.startMarker.column = this.scanner.index - this.scanner.lineStart;
				var start = this.scanner.index;
				var text = '';
				while (!this.scanner.eof()) {
					var ch = this.scanner.source[this.scanner.index];
					if (ch === '{' || ch === '<') {
						break;
					}
					++this.scanner.index;
					text += ch;
					if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
						++this.scanner.lineNumber;
						if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
							++this.scanner.index;
						}
						this.scanner.lineStart = this.scanner.index;
					}
				}
				this.lastMarker.index = this.scanner.index;
				this.lastMarker.line = this.scanner.lineNumber;
				this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
				var token = {
					type: 101 /* Text */,
					value: text,
					lineNumber: this.scanner.lineNumber,
					lineStart: this.scanner.lineStart,
					start: start,
					end: this.scanner.index
				};
				if ((text.length > 0) && this.config.tokens) {
					this.tokens.push(this.convertToken(token));
				}
				return token;
			};
			JSXParser.prototype.peekJSXToken = function () {
				var state = this.scanner.saveState();
				this.scanner.scanComments();
				var next = this.lexJSX();
				this.scanner.restoreState(state);
				return next;
			};
			// Expect the next JSX token to match the specified punctuator.
			// If not, an exception will be thrown.
			JSXParser.prototype.expectJSX = function (value) {
				var token = this.nextJSXToken();
				if (token.type !== 7 /* Punctuator */ || token.value !== value) {
					this.throwUnexpectedToken(token);
				}
			};
			// Return true if the next JSX token matches the specified punctuator.
			JSXParser.prototype.matchJSX = function (value) {
				var next = this.peekJSXToken();
				return next.type === 7 /* Punctuator */ && next.value === value;
			};
			JSXParser.prototype.parseJSXIdentifier = function () {
				var node = this.createJSXNode();
				var token = this.nextJSXToken();
				if (token.type !== 100 /* Identifier */) {
					this.throwUnexpectedToken(token);
				}
				return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
			};
			JSXParser.prototype.parseJSXElementName = function () {
				var node = this.createJSXNode();
				var elementName = this.parseJSXIdentifier();
				if (this.matchJSX(':')) {
					var namespace = elementName;
					this.expectJSX(':');
					var name_1 = this.parseJSXIdentifier();
					elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
				}
				else if (this.matchJSX('.')) {
					while (this.matchJSX('.')) {
						var object = elementName;
						this.expectJSX('.');
						var property = this.parseJSXIdentifier();
						elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
					}
				}
				return elementName;
			};
			JSXParser.prototype.parseJSXAttributeName = function () {
				var node = this.createJSXNode();
				var attributeName;
				var identifier = this.parseJSXIdentifier();
				if (this.matchJSX(':')) {
					var namespace = identifier;
					this.expectJSX(':');
					var name_2 = this.parseJSXIdentifier();
					attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
				}
				else {
					attributeName = identifier;
				}
				return attributeName;
			};
			JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
				var node = this.createJSXNode();
				var token = this.nextJSXToken();
				if (token.type !== 8 /* StringLiteral */) {
					this.throwUnexpectedToken(token);
				}
				var raw = this.getTokenRaw(token);
				return this.finalize(node, new Node.Literal(token.value, raw));
			};
			JSXParser.prototype.parseJSXExpressionAttribute = function () {
				var node = this.createJSXNode();
				this.expectJSX('{');
				this.finishJSX();
				if (this.match('}')) {
					this.tolerateError('JSX attributes must only be assigned a non-empty expression');
				}
				var expression = this.parseAssignmentExpression();
				this.reenterJSX();
				return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
			};
			JSXParser.prototype.parseJSXAttributeValue = function () {
				return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
					this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
			};
			JSXParser.prototype.parseJSXNameValueAttribute = function () {
				var node = this.createJSXNode();
				var name = this.parseJSXAttributeName();
				var value = null;
				if (this.matchJSX('=')) {
					this.expectJSX('=');
					value = this.parseJSXAttributeValue();
				}
				return this.finalize(node, new JSXNode.JSXAttribute(name, value));
			};
			JSXParser.prototype.parseJSXSpreadAttribute = function () {
				var node = this.createJSXNode();
				this.expectJSX('{');
				this.expectJSX('...');
				this.finishJSX();
				var argument = this.parseAssignmentExpression();
				this.reenterJSX();
				return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
			};
			JSXParser.prototype.parseJSXAttributes = function () {
				var attributes = [];
				while (!this.matchJSX('/') && !this.matchJSX('>')) {
					var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
						this.parseJSXNameValueAttribute();
					attributes.push(attribute);
				}
				return attributes;
			};
			JSXParser.prototype.parseJSXOpeningElement = function () {
				var node = this.createJSXNode();
				this.expectJSX('<');
				var name = this.parseJSXElementName();
				var attributes = this.parseJSXAttributes();
				var selfClosing = this.matchJSX('/');
				if (selfClosing) {
					this.expectJSX('/');
				}
				this.expectJSX('>');
				return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
			};
			JSXParser.prototype.parseJSXBoundaryElement = function () {
				var node = this.createJSXNode();
				this.expectJSX('<');
				if (this.matchJSX('/')) {
					this.expectJSX('/');
					var name_3 = this.parseJSXElementName();
					this.expectJSX('>');
					return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
				}
				var name = this.parseJSXElementName();
				var attributes = this.parseJSXAttributes();
				var selfClosing = this.matchJSX('/');
				if (selfClosing) {
					this.expectJSX('/');
				}
				this.expectJSX('>');
				return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
			};
			JSXParser.prototype.parseJSXEmptyExpression = function () {
				var node = this.createJSXChildNode();
				this.collectComments();
				this.lastMarker.index = this.scanner.index;
				this.lastMarker.line = this.scanner.lineNumber;
				this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
				return this.finalize(node, new JSXNode.JSXEmptyExpression());
			};
			JSXParser.prototype.parseJSXExpressionContainer = function () {
				var node = this.createJSXNode();
				this.expectJSX('{');
				var expression;
				if (this.matchJSX('}')) {
					expression = this.parseJSXEmptyExpression();
					this.expectJSX('}');
				}
				else {
					this.finishJSX();
					expression = this.parseAssignmentExpression();
					this.reenterJSX();
				}
				return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
			};
			JSXParser.prototype.parseJSXChildren = function () {
				var children = [];
				while (!this.scanner.eof()) {
					var node = this.createJSXChildNode();
					var token = this.nextJSXText();
					if (token.start < token.end) {
						var raw = this.getTokenRaw(token);
						var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
						children.push(child);
					}
					if (this.scanner.source[this.scanner.index] === '{') {
						var container = this.parseJSXExpressionContainer();
						children.push(container);
					}
					else {
						break;
					}
				}
				return children;
			};
			JSXParser.prototype.parseComplexJSXElement = function (el) {
				var stack = [];
				while (!this.scanner.eof()) {
					el.children = el.children.concat(this.parseJSXChildren());
					var node = this.createJSXChildNode();
					var element = this.parseJSXBoundaryElement();
					if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
						var opening = element;
						if (opening.selfClosing) {
							var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
							el.children.push(child);
						}
						else {
							stack.push(el);
							el = { node: node, opening: opening, closing: null, children: [] };
						}
					}
					if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
						el.closing = element;
						var open_1 = getQualifiedElementName(el.opening.name);
						var close_1 = getQualifiedElementName(el.closing.name);
						if (open_1 !== close_1) {
							this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
						}
						if (stack.length > 0) {
							var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
							el = stack[stack.length - 1];
							el.children.push(child);
							stack.pop();
						}
						else {
							break;
						}
					}
				}
				return el;
			};
			JSXParser.prototype.parseJSXElement = function () {
				var node = this.createJSXNode();
				var opening = this.parseJSXOpeningElement();
				var children = [];
				var closing = null;
				if (!opening.selfClosing) {
					var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
					children = el.children;
					closing = el.closing;
				}
				return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
			};
			JSXParser.prototype.parseJSXRoot = function () {
				// Pop the opening '<' added from the lookahead.
				if (this.config.tokens) {
					this.tokens.pop();
				}
				this.startJSX();
				var element = this.parseJSXElement();
				this.finishJSX();
				return element;
			};
			JSXParser.prototype.isStartOfExpression = function () {
				return _super.prototype.isStartOfExpression.call(this) || this.match('<');
			};
			return JSXParser;
		}(parser_1.Parser));
		exports.JSXParser = JSXParser;
	
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		// See also tools/generate-unicode-regex.js.
		var Regex = {
			// Unicode v8.0.0 NonAsciiIdentifierStart:
			NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
			// Unicode v8.0.0 NonAsciiIdentifierPart:
			NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		};
		exports.Character = {
			/* tslint:disable:no-bitwise */
			fromCodePoint: function (cp) {
				return (cp < 0x10000) ? String.fromCharCode(cp) :
					String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
						String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
			},
			// https://tc39.github.io/ecma262/#sec-white-space
			isWhiteSpace: function (cp) {
				return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
					(cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
			},
			// https://tc39.github.io/ecma262/#sec-line-terminators
			isLineTerminator: function (cp) {
				return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
			},
			// https://tc39.github.io/ecma262/#sec-names-and-keywords
			isIdentifierStart: function (cp) {
				return (cp === 0x24) || (cp === 0x5F) ||
					(cp >= 0x41 && cp <= 0x5A) ||
					(cp >= 0x61 && cp <= 0x7A) ||
					(cp === 0x5C) ||
					((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
			},
			isIdentifierPart: function (cp) {
				return (cp === 0x24) || (cp === 0x5F) ||
					(cp >= 0x41 && cp <= 0x5A) ||
					(cp >= 0x61 && cp <= 0x7A) ||
					(cp >= 0x30 && cp <= 0x39) ||
					(cp === 0x5C) ||
					((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
			},
			// https://tc39.github.io/ecma262/#sec-literals-numeric-literals
			isDecimalDigit: function (cp) {
				return (cp >= 0x30 && cp <= 0x39); // 0..9
			},
			isHexDigit: function (cp) {
				return (cp >= 0x30 && cp <= 0x39) ||
					(cp >= 0x41 && cp <= 0x46) ||
					(cp >= 0x61 && cp <= 0x66); // a..f
			},
			isOctalDigit: function (cp) {
				return (cp >= 0x30 && cp <= 0x37); // 0..7
			}
		};
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var jsx_syntax_1 = __webpack_require__(6);
		/* tslint:disable:max-classes-per-file */
		var JSXClosingElement = (function () {
			function JSXClosingElement(name) {
				this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
				this.name = name;
			}
			return JSXClosingElement;
		}());
		exports.JSXClosingElement = JSXClosingElement;
		var JSXElement = (function () {
			function JSXElement(openingElement, children, closingElement) {
				this.type = jsx_syntax_1.JSXSyntax.JSXElement;
				this.openingElement = openingElement;
				this.children = children;
				this.closingElement = closingElement;
			}
			return JSXElement;
		}());
		exports.JSXElement = JSXElement;
		var JSXEmptyExpression = (function () {
			function JSXEmptyExpression() {
				this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
			}
			return JSXEmptyExpression;
		}());
		exports.JSXEmptyExpression = JSXEmptyExpression;
		var JSXExpressionContainer = (function () {
			function JSXExpressionContainer(expression) {
				this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
				this.expression = expression;
			}
			return JSXExpressionContainer;
		}());
		exports.JSXExpressionContainer = JSXExpressionContainer;
		var JSXIdentifier = (function () {
			function JSXIdentifier(name) {
				this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
				this.name = name;
			}
			return JSXIdentifier;
		}());
		exports.JSXIdentifier = JSXIdentifier;
		var JSXMemberExpression = (function () {
			function JSXMemberExpression(object, property) {
				this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
				this.object = object;
				this.property = property;
			}
			return JSXMemberExpression;
		}());
		exports.JSXMemberExpression = JSXMemberExpression;
		var JSXAttribute = (function () {
			function JSXAttribute(name, value) {
				this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
				this.name = name;
				this.value = value;
			}
			return JSXAttribute;
		}());
		exports.JSXAttribute = JSXAttribute;
		var JSXNamespacedName = (function () {
			function JSXNamespacedName(namespace, name) {
				this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
				this.namespace = namespace;
				this.name = name;
			}
			return JSXNamespacedName;
		}());
		exports.JSXNamespacedName = JSXNamespacedName;
		var JSXOpeningElement = (function () {
			function JSXOpeningElement(name, selfClosing, attributes) {
				this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
				this.name = name;
				this.selfClosing = selfClosing;
				this.attributes = attributes;
			}
			return JSXOpeningElement;
		}());
		exports.JSXOpeningElement = JSXOpeningElement;
		var JSXSpreadAttribute = (function () {
			function JSXSpreadAttribute(argument) {
				this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
				this.argument = argument;
			}
			return JSXSpreadAttribute;
		}());
		exports.JSXSpreadAttribute = JSXSpreadAttribute;
		var JSXText = (function () {
			function JSXText(value, raw) {
				this.type = jsx_syntax_1.JSXSyntax.JSXText;
				this.value = value;
				this.raw = raw;
			}
			return JSXText;
		}());
		exports.JSXText = JSXText;
	
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.JSXSyntax = {
			JSXAttribute: 'JSXAttribute',
			JSXClosingElement: 'JSXClosingElement',
			JSXElement: 'JSXElement',
			JSXEmptyExpression: 'JSXEmptyExpression',
			JSXExpressionContainer: 'JSXExpressionContainer',
			JSXIdentifier: 'JSXIdentifier',
			JSXMemberExpression: 'JSXMemberExpression',
			JSXNamespacedName: 'JSXNamespacedName',
			JSXOpeningElement: 'JSXOpeningElement',
			JSXSpreadAttribute: 'JSXSpreadAttribute',
			JSXText: 'JSXText'
		};
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var syntax_1 = __webpack_require__(2);
		/* tslint:disable:max-classes-per-file */
		var ArrayExpression = (function () {
			function ArrayExpression(elements) {
				this.type = syntax_1.Syntax.ArrayExpression;
				this.elements = elements;
			}
			return ArrayExpression;
		}());
		exports.ArrayExpression = ArrayExpression;
		var ArrayPattern = (function () {
			function ArrayPattern(elements) {
				this.type = syntax_1.Syntax.ArrayPattern;
				this.elements = elements;
			}
			return ArrayPattern;
		}());
		exports.ArrayPattern = ArrayPattern;
		var ArrowFunctionExpression = (function () {
			function ArrowFunctionExpression(params, body, expression) {
				this.type = syntax_1.Syntax.ArrowFunctionExpression;
				this.id = null;
				this.params = params;
				this.body = body;
				this.generator = false;
				this.expression = expression;
				this.async = false;
			}
			return ArrowFunctionExpression;
		}());
		exports.ArrowFunctionExpression = ArrowFunctionExpression;
		var AssignmentExpression = (function () {
			function AssignmentExpression(operator, left, right) {
				this.type = syntax_1.Syntax.AssignmentExpression;
				this.operator = operator;
				this.left = left;
				this.right = right;
			}
			return AssignmentExpression;
		}());
		exports.AssignmentExpression = AssignmentExpression;
		var AssignmentPattern = (function () {
			function AssignmentPattern(left, right) {
				this.type = syntax_1.Syntax.AssignmentPattern;
				this.left = left;
				this.right = right;
			}
			return AssignmentPattern;
		}());
		exports.AssignmentPattern = AssignmentPattern;
		var AsyncArrowFunctionExpression = (function () {
			function AsyncArrowFunctionExpression(params, body, expression) {
				this.type = syntax_1.Syntax.ArrowFunctionExpression;
				this.id = null;
				this.params = params;
				this.body = body;
				this.generator = false;
				this.expression = expression;
				this.async = true;
			}
			return AsyncArrowFunctionExpression;
		}());
		exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
		var AsyncFunctionDeclaration = (function () {
			function AsyncFunctionDeclaration(id, params, body) {
				this.type = syntax_1.Syntax.FunctionDeclaration;
				this.id = id;
				this.params = params;
				this.body = body;
				this.generator = false;
				this.expression = false;
				this.async = true;
			}
			return AsyncFunctionDeclaration;
		}());
		exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
		var AsyncFunctionExpression = (function () {
			function AsyncFunctionExpression(id, params, body) {
				this.type = syntax_1.Syntax.FunctionExpression;
				this.id = id;
				this.params = params;
				this.body = body;
				this.generator = false;
				this.expression = false;
				this.async = true;
			}
			return AsyncFunctionExpression;
		}());
		exports.AsyncFunctionExpression = AsyncFunctionExpression;
		var AwaitExpression = (function () {
			function AwaitExpression(argument) {
				this.type = syntax_1.Syntax.AwaitExpression;
				this.argument = argument;
			}
			return AwaitExpression;
		}());
		exports.AwaitExpression = AwaitExpression;
		var BinaryExpression = (function () {
			function BinaryExpression(operator, left, right) {
				var logical = (operator === '||' || operator === '&&');
				this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
				this.operator = operator;
				this.left = left;
				this.right = right;
			}
			return BinaryExpression;
		}());
		exports.BinaryExpression = BinaryExpression;
		var BlockStatement = (function () {
			function BlockStatement(body) {
				this.type = syntax_1.Syntax.BlockStatement;
				this.body = body;
			}
			return BlockStatement;
		}());
		exports.BlockStatement = BlockStatement;
		var BreakStatement = (function () {
			function BreakStatement(label) {
				this.type = syntax_1.Syntax.BreakStatement;
				this.label = label;
			}
			return BreakStatement;
		}());
		exports.BreakStatement = BreakStatement;
		var CallExpression = (function () {
			function CallExpression(callee, args) {
				this.type = syntax_1.Syntax.CallExpression;
				this.callee = callee;
				this.arguments = args;
			}
			return CallExpression;
		}());
		exports.CallExpression = CallExpression;
		var CatchClause = (function () {
			function CatchClause(param, body) {
				this.type = syntax_1.Syntax.CatchClause;
				this.param = param;
				this.body = body;
			}
			return CatchClause;
		}());
		exports.CatchClause = CatchClause;
		var ClassBody = (function () {
			function ClassBody(body) {
				this.type = syntax_1.Syntax.ClassBody;
				this.body = body;
			}
			return ClassBody;
		}());
		exports.ClassBody = ClassBody;
		var ClassDeclaration = (function () {
			function ClassDeclaration(id, superClass, body) {
				this.type = syntax_1.Syntax.ClassDeclaration;
				this.id = id;
				this.superClass = superClass;
				this.body = body;
			}
			return ClassDeclaration;
		}());
		exports.ClassDeclaration = ClassDeclaration;
		var ClassExpression = (function () {
			function ClassExpression(id, superClass, body) {
				this.type = syntax_1.Syntax.ClassExpression;
				this.id = id;
				this.superClass = superClass;
				this.body = body;
			}
			return ClassExpression;
		}());
		exports.ClassExpression = ClassExpression;
		var ComputedMemberExpression = (function () {
			function ComputedMemberExpression(object, property) {
				this.type = syntax_1.Syntax.MemberExpression;
				this.computed = true;
				this.object = object;
				this.property = property;
			}
			return ComputedMemberExpression;
		}());
		exports.ComputedMemberExpression = ComputedMemberExpression;
		var ConditionalExpression = (function () {
			function ConditionalExpression(test, consequent, alternate) {
				this.type = syntax_1.Syntax.ConditionalExpression;
				this.test = test;
				this.consequent = consequent;
				this.alternate = alternate;
			}
			return ConditionalExpression;
		}());
		exports.ConditionalExpression = ConditionalExpression;
		var ContinueStatement = (function () {
			function ContinueStatement(label) {
				this.type = syntax_1.Syntax.ContinueStatement;
				this.label = label;
			}
			return ContinueStatement;
		}());
		exports.ContinueStatement = ContinueStatement;
		var DebuggerStatement = (function () {
			function DebuggerStatement() {
				this.type = syntax_1.Syntax.DebuggerStatement;
			}
			return DebuggerStatement;
		}());
		exports.DebuggerStatement = DebuggerStatement;
		var Directive = (function () {
			function Directive(expression, directive) {
				this.type = syntax_1.Syntax.ExpressionStatement;
				this.expression = expression;
				this.directive = directive;
			}
			return Directive;
		}());
		exports.Directive = Directive;
		var DoWhileStatement = (function () {
			function DoWhileStatement(body, test) {
				this.type = syntax_1.Syntax.DoWhileStatement;
				this.body = body;
				this.test = test;
			}
			return DoWhileStatement;
		}());
		exports.DoWhileStatement = DoWhileStatement;
		var EmptyStatement = (function () {
			function EmptyStatement() {
				this.type = syntax_1.Syntax.EmptyStatement;
			}
			return EmptyStatement;
		}());
		exports.EmptyStatement = EmptyStatement;
		var ExportAllDeclaration = (function () {
			function ExportAllDeclaration(source) {
				this.type = syntax_1.Syntax.ExportAllDeclaration;
				this.source = source;
			}
			return ExportAllDeclaration;
		}());
		exports.ExportAllDeclaration = ExportAllDeclaration;
		var ExportDefaultDeclaration = (function () {
			function ExportDefaultDeclaration(declaration) {
				this.type = syntax_1.Syntax.ExportDefaultDeclaration;
				this.declaration = declaration;
			}
			return ExportDefaultDeclaration;
		}());
		exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
		var ExportNamedDeclaration = (function () {
			function ExportNamedDeclaration(declaration, specifiers, source) {
				this.type = syntax_1.Syntax.ExportNamedDeclaration;
				this.declaration = declaration;
				this.specifiers = specifiers;
				this.source = source;
			}
			return ExportNamedDeclaration;
		}());
		exports.ExportNamedDeclaration = ExportNamedDeclaration;
		var ExportSpecifier = (function () {
			function ExportSpecifier(local, exported) {
				this.type = syntax_1.Syntax.ExportSpecifier;
				this.exported = exported;
				this.local = local;
			}
			return ExportSpecifier;
		}());
		exports.ExportSpecifier = ExportSpecifier;
		var ExpressionStatement = (function () {
			function ExpressionStatement(expression) {
				this.type = syntax_1.Syntax.ExpressionStatement;
				this.expression = expression;
			}
			return ExpressionStatement;
		}());
		exports.ExpressionStatement = ExpressionStatement;
		var ForInStatement = (function () {
			function ForInStatement(left, right, body) {
				this.type = syntax_1.Syntax.ForInStatement;
				this.left = left;
				this.right = right;
				this.body = body;
				this.each = false;
			}
			return ForInStatement;
		}());
		exports.ForInStatement = ForInStatement;
		var ForOfStatement = (function () {
			function ForOfStatement(left, right, body) {
				this.type = syntax_1.Syntax.ForOfStatement;
				this.left = left;
				this.right = right;
				this.body = body;
			}
			return ForOfStatement;
		}());
		exports.ForOfStatement = ForOfStatement;
		var ForStatement = (function () {
			function ForStatement(init, test, update, body) {
				this.type = syntax_1.Syntax.ForStatement;
				this.init = init;
				this.test = test;
				this.update = update;
				this.body = body;
			}
			return ForStatement;
		}());
		exports.ForStatement = ForStatement;
		var FunctionDeclaration = (function () {
			function FunctionDeclaration(id, params, body, generator) {
				this.type = syntax_1.Syntax.FunctionDeclaration;
				this.id = id;
				this.params = params;
				this.body = body;
				this.generator = generator;
				this.expression = false;
				this.async = false;
			}
			return FunctionDeclaration;
		}());
		exports.FunctionDeclaration = FunctionDeclaration;
		var FunctionExpression = (function () {
			function FunctionExpression(id, params, body, generator) {
				this.type = syntax_1.Syntax.FunctionExpression;
				this.id = id;
				this.params = params;
				this.body = body;
				this.generator = generator;
				this.expression = false;
				this.async = false;
			}
			return FunctionExpression;
		}());
		exports.FunctionExpression = FunctionExpression;
		var Identifier = (function () {
			function Identifier(name) {
				this.type = syntax_1.Syntax.Identifier;
				this.name = name;
			}
			return Identifier;
		}());
		exports.Identifier = Identifier;
		var IfStatement = (function () {
			function IfStatement(test, consequent, alternate) {
				this.type = syntax_1.Syntax.IfStatement;
				this.test = test;
				this.consequent = consequent;
				this.alternate = alternate;
			}
			return IfStatement;
		}());
		exports.IfStatement = IfStatement;
		var ImportDeclaration = (function () {
			function ImportDeclaration(specifiers, source) {
				this.type = syntax_1.Syntax.ImportDeclaration;
				this.specifiers = specifiers;
				this.source = source;
			}
			return ImportDeclaration;
		}());
		exports.ImportDeclaration = ImportDeclaration;
		var ImportDefaultSpecifier = (function () {
			function ImportDefaultSpecifier(local) {
				this.type = syntax_1.Syntax.ImportDefaultSpecifier;
				this.local = local;
			}
			return ImportDefaultSpecifier;
		}());
		exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
		var ImportNamespaceSpecifier = (function () {
			function ImportNamespaceSpecifier(local) {
				this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
				this.local = local;
			}
			return ImportNamespaceSpecifier;
		}());
		exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
		var ImportSpecifier = (function () {
			function ImportSpecifier(local, imported) {
				this.type = syntax_1.Syntax.ImportSpecifier;
				this.local = local;
				this.imported = imported;
			}
			return ImportSpecifier;
		}());
		exports.ImportSpecifier = ImportSpecifier;
		var LabeledStatement = (function () {
			function LabeledStatement(label, body) {
				this.type = syntax_1.Syntax.LabeledStatement;
				this.label = label;
				this.body = body;
			}
			return LabeledStatement;
		}());
		exports.LabeledStatement = LabeledStatement;
		var Literal = (function () {
			function Literal(value, raw) {
				this.type = syntax_1.Syntax.Literal;
				this.value = value;
				this.raw = raw;
			}
			return Literal;
		}());
		exports.Literal = Literal;
		var MetaProperty = (function () {
			function MetaProperty(meta, property) {
				this.type = syntax_1.Syntax.MetaProperty;
				this.meta = meta;
				this.property = property;
			}
			return MetaProperty;
		}());
		exports.MetaProperty = MetaProperty;
		var MethodDefinition = (function () {
			function MethodDefinition(key, computed, value, kind, isStatic) {
				this.type = syntax_1.Syntax.MethodDefinition;
				this.key = key;
				this.computed = computed;
				this.value = value;
				this.kind = kind;
				this.static = isStatic;
			}
			return MethodDefinition;
		}());
		exports.MethodDefinition = MethodDefinition;
		var Module = (function () {
			function Module(body) {
				this.type = syntax_1.Syntax.Program;
				this.body = body;
				this.sourceType = 'module';
			}
			return Module;
		}());
		exports.Module = Module;
		var NewExpression = (function () {
			function NewExpression(callee, args) {
				this.type = syntax_1.Syntax.NewExpression;
				this.callee = callee;
				this.arguments = args;
			}
			return NewExpression;
		}());
		exports.NewExpression = NewExpression;
		var ObjectExpression = (function () {
			function ObjectExpression(properties) {
				this.type = syntax_1.Syntax.ObjectExpression;
				this.properties = properties;
			}
			return ObjectExpression;
		}());
		exports.ObjectExpression = ObjectExpression;
		var ObjectPattern = (function () {
			function ObjectPattern(properties) {
				this.type = syntax_1.Syntax.ObjectPattern;
				this.properties = properties;
			}
			return ObjectPattern;
		}());
		exports.ObjectPattern = ObjectPattern;
		var Property = (function () {
			function Property(kind, key, computed, value, method, shorthand) {
				this.type = syntax_1.Syntax.Property;
				this.key = key;
				this.computed = computed;
				this.value = value;
				this.kind = kind;
				this.method = method;
				this.shorthand = shorthand;
			}
			return Property;
		}());
		exports.Property = Property;
		var RegexLiteral = (function () {
			function RegexLiteral(value, raw, pattern, flags) {
				this.type = syntax_1.Syntax.Literal;
				this.value = value;
				this.raw = raw;
				this.regex = { pattern: pattern, flags: flags };
			}
			return RegexLiteral;
		}());
		exports.RegexLiteral = RegexLiteral;
		var RestElement = (function () {
			function RestElement(argument) {
				this.type = syntax_1.Syntax.RestElement;
				this.argument = argument;
			}
			return RestElement;
		}());
		exports.RestElement = RestElement;
		var ReturnStatement = (function () {
			function ReturnStatement(argument) {
				this.type = syntax_1.Syntax.ReturnStatement;
				this.argument = argument;
			}
			return ReturnStatement;
		}());
		exports.ReturnStatement = ReturnStatement;
		var Script = (function () {
			function Script(body) {
				this.type = syntax_1.Syntax.Program;
				this.body = body;
				this.sourceType = 'script';
			}
			return Script;
		}());
		exports.Script = Script;
		var SequenceExpression = (function () {
			function SequenceExpression(expressions) {
				this.type = syntax_1.Syntax.SequenceExpression;
				this.expressions = expressions;
			}
			return SequenceExpression;
		}());
		exports.SequenceExpression = SequenceExpression;
		var SpreadElement = (function () {
			function SpreadElement(argument) {
				this.type = syntax_1.Syntax.SpreadElement;
				this.argument = argument;
			}
			return SpreadElement;
		}());
		exports.SpreadElement = SpreadElement;
		var StaticMemberExpression = (function () {
			function StaticMemberExpression(object, property) {
				this.type = syntax_1.Syntax.MemberExpression;
				this.computed = false;
				this.object = object;
				this.property = property;
			}
			return StaticMemberExpression;
		}());
		exports.StaticMemberExpression = StaticMemberExpression;
		var Super = (function () {
			function Super() {
				this.type = syntax_1.Syntax.Super;
			}
			return Super;
		}());
		exports.Super = Super;
		var SwitchCase = (function () {
			function SwitchCase(test, consequent) {
				this.type = syntax_1.Syntax.SwitchCase;
				this.test = test;
				this.consequent = consequent;
			}
			return SwitchCase;
		}());
		exports.SwitchCase = SwitchCase;
		var SwitchStatement = (function () {
			function SwitchStatement(discriminant, cases) {
				this.type = syntax_1.Syntax.SwitchStatement;
				this.discriminant = discriminant;
				this.cases = cases;
			}
			return SwitchStatement;
		}());
		exports.SwitchStatement = SwitchStatement;
		var TaggedTemplateExpression = (function () {
			function TaggedTemplateExpression(tag, quasi) {
				this.type = syntax_1.Syntax.TaggedTemplateExpression;
				this.tag = tag;
				this.quasi = quasi;
			}
			return TaggedTemplateExpression;
		}());
		exports.TaggedTemplateExpression = TaggedTemplateExpression;
		var TemplateElement = (function () {
			function TemplateElement(value, tail) {
				this.type = syntax_1.Syntax.TemplateElement;
				this.value = value;
				this.tail = tail;
			}
			return TemplateElement;
		}());
		exports.TemplateElement = TemplateElement;
		var TemplateLiteral = (function () {
			function TemplateLiteral(quasis, expressions) {
				this.type = syntax_1.Syntax.TemplateLiteral;
				this.quasis = quasis;
				this.expressions = expressions;
			}
			return TemplateLiteral;
		}());
		exports.TemplateLiteral = TemplateLiteral;
		var ThisExpression = (function () {
			function ThisExpression() {
				this.type = syntax_1.Syntax.ThisExpression;
			}
			return ThisExpression;
		}());
		exports.ThisExpression = ThisExpression;
		var ThrowStatement = (function () {
			function ThrowStatement(argument) {
				this.type = syntax_1.Syntax.ThrowStatement;
				this.argument = argument;
			}
			return ThrowStatement;
		}());
		exports.ThrowStatement = ThrowStatement;
		var TryStatement = (function () {
			function TryStatement(block, handler, finalizer) {
				this.type = syntax_1.Syntax.TryStatement;
				this.block = block;
				this.handler = handler;
				this.finalizer = finalizer;
			}
			return TryStatement;
		}());
		exports.TryStatement = TryStatement;
		var UnaryExpression = (function () {
			function UnaryExpression(operator, argument) {
				this.type = syntax_1.Syntax.UnaryExpression;
				this.operator = operator;
				this.argument = argument;
				this.prefix = true;
			}
			return UnaryExpression;
		}());
		exports.UnaryExpression = UnaryExpression;
		var UpdateExpression = (function () {
			function UpdateExpression(operator, argument, prefix) {
				this.type = syntax_1.Syntax.UpdateExpression;
				this.operator = operator;
				this.argument = argument;
				this.prefix = prefix;
			}
			return UpdateExpression;
		}());
		exports.UpdateExpression = UpdateExpression;
		var VariableDeclaration = (function () {
			function VariableDeclaration(declarations, kind) {
				this.type = syntax_1.Syntax.VariableDeclaration;
				this.declarations = declarations;
				this.kind = kind;
			}
			return VariableDeclaration;
		}());
		exports.VariableDeclaration = VariableDeclaration;
		var VariableDeclarator = (function () {
			function VariableDeclarator(id, init) {
				this.type = syntax_1.Syntax.VariableDeclarator;
				this.id = id;
				this.init = init;
			}
			return VariableDeclarator;
		}());
		exports.VariableDeclarator = VariableDeclarator;
		var WhileStatement = (function () {
			function WhileStatement(test, body) {
				this.type = syntax_1.Syntax.WhileStatement;
				this.test = test;
				this.body = body;
			}
			return WhileStatement;
		}());
		exports.WhileStatement = WhileStatement;
		var WithStatement = (function () {
			function WithStatement(object, body) {
				this.type = syntax_1.Syntax.WithStatement;
				this.object = object;
				this.body = body;
			}
			return WithStatement;
		}());
		exports.WithStatement = WithStatement;
		var YieldExpression = (function () {
			function YieldExpression(argument, delegate) {
				this.type = syntax_1.Syntax.YieldExpression;
				this.argument = argument;
				this.delegate = delegate;
			}
			return YieldExpression;
		}());
		exports.YieldExpression = YieldExpression;
	
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var assert_1 = __webpack_require__(9);
		var error_handler_1 = __webpack_require__(10);
		var messages_1 = __webpack_require__(11);
		var Node = __webpack_require__(7);
		var scanner_1 = __webpack_require__(12);
		var syntax_1 = __webpack_require__(2);
		var token_1 = __webpack_require__(13);
		var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
		var Parser = (function () {
			function Parser(code, options, delegate) {
				if (options === void 0) { options = {}; }
				this.config = {
					range: (typeof options.range === 'boolean') && options.range,
					loc: (typeof options.loc === 'boolean') && options.loc,
					source: null,
					tokens: (typeof options.tokens === 'boolean') && options.tokens,
					comment: (typeof options.comment === 'boolean') && options.comment,
					tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
				};
				if (this.config.loc && options.source && options.source !== null) {
					this.config.source = String(options.source);
				}
				this.delegate = delegate;
				this.errorHandler = new error_handler_1.ErrorHandler();
				this.errorHandler.tolerant = this.config.tolerant;
				this.scanner = new scanner_1.Scanner(code, this.errorHandler);
				this.scanner.trackComment = this.config.comment;
				this.operatorPrecedence = {
					')': 0,
					';': 0,
					',': 0,
					'=': 0,
					']': 0,
					'||': 1,
					'&&': 2,
					'|': 3,
					'^': 4,
					'&': 5,
					'==': 6,
					'!=': 6,
					'===': 6,
					'!==': 6,
					'<': 7,
					'>': 7,
					'<=': 7,
					'>=': 7,
					'<<': 8,
					'>>': 8,
					'>>>': 8,
					'+': 9,
					'-': 9,
					'*': 11,
					'/': 11,
					'%': 11
				};
				this.lookahead = {
					type: 2 /* EOF */,
					value: '',
					lineNumber: this.scanner.lineNumber,
					lineStart: 0,
					start: 0,
					end: 0
				};
				this.hasLineTerminator = false;
				this.context = {
					isModule: false,
					await: false,
					allowIn: true,
					allowStrictDirective: true,
					allowYield: true,
					firstCoverInitializedNameError: null,
					isAssignmentTarget: false,
					isBindingElement: false,
					inFunctionBody: false,
					inIteration: false,
					inSwitch: false,
					labelSet: {},
					strict: false
				};
				this.tokens = [];
				this.startMarker = {
					index: 0,
					line: this.scanner.lineNumber,
					column: 0
				};
				this.lastMarker = {
					index: 0,
					line: this.scanner.lineNumber,
					column: 0
				};
				this.nextToken();
				this.lastMarker = {
					index: this.scanner.index,
					line: this.scanner.lineNumber,
					column: this.scanner.index - this.scanner.lineStart
				};
			}
			Parser.prototype.throwError = function (messageFormat) {
				var values = [];
				for (var _i = 1; _i < arguments.length; _i++) {
					values[_i - 1] = arguments[_i];
				}
				var args = Array.prototype.slice.call(arguments, 1);
				var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
					assert_1.assert(idx < args.length, 'Message reference must be in range');
					return args[idx];
				});
				var index = this.lastMarker.index;
				var line = this.lastMarker.line;
				var column = this.lastMarker.column + 1;
				throw this.errorHandler.createError(index, line, column, msg);
			};
			Parser.prototype.tolerateError = function (messageFormat) {
				var values = [];
				for (var _i = 1; _i < arguments.length; _i++) {
					values[_i - 1] = arguments[_i];
				}
				var args = Array.prototype.slice.call(arguments, 1);
				var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
					assert_1.assert(idx < args.length, 'Message reference must be in range');
					return args[idx];
				});
				var index = this.lastMarker.index;
				var line = this.scanner.lineNumber;
				var column = this.lastMarker.column + 1;
				this.errorHandler.tolerateError(index, line, column, msg);
			};
			// Throw an exception because of the token.
			Parser.prototype.unexpectedTokenError = function (token, message) {
				var msg = message || messages_1.Messages.UnexpectedToken;
				var value;
				if (token) {
					if (!message) {
						msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
							(token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
								(token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
									(token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
										(token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
											messages_1.Messages.UnexpectedToken;
						if (token.type === 4 /* Keyword */) {
							if (this.scanner.isFutureReservedWord(token.value)) {
								msg = messages_1.Messages.UnexpectedReserved;
							}
							else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
								msg = messages_1.Messages.StrictReservedWord;
							}
						}
					}
					value = token.value;
				}
				else {
					value = 'ILLEGAL';
				}
				msg = msg.replace('%0', value);
				if (token && typeof token.lineNumber === 'number') {
					var index = token.start;
					var line = token.lineNumber;
					var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
					var column = token.start - lastMarkerLineStart + 1;
					return this.errorHandler.createError(index, line, column, msg);
				}
				else {
					var index = this.lastMarker.index;
					var line = this.lastMarker.line;
					var column = this.lastMarker.column + 1;
					return this.errorHandler.createError(index, line, column, msg);
				}
			};
			Parser.prototype.throwUnexpectedToken = function (token, message) {
				throw this.unexpectedTokenError(token, message);
			};
			Parser.prototype.tolerateUnexpectedToken = function (token, message) {
				this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
			};
			Parser.prototype.collectComments = function () {
				if (!this.config.comment) {
					this.scanner.scanComments();
				}
				else {
					var comments = this.scanner.scanComments();
					if (comments.length > 0 && this.delegate) {
						for (var i = 0; i < comments.length; ++i) {
							var e = comments[i];
							var node = void 0;
							node = {
								type: e.multiLine ? 'BlockComment' : 'LineComment',
								value: this.scanner.source.slice(e.slice[0], e.slice[1])
							};
							if (this.config.range) {
								node.range = e.range;
							}
							if (this.config.loc) {
								node.loc = e.loc;
							}
							var metadata = {
								start: {
									line: e.loc.start.line,
									column: e.loc.start.column,
									offset: e.range[0]
								},
								end: {
									line: e.loc.end.line,
									column: e.loc.end.column,
									offset: e.range[1]
								}
							};
							this.delegate(node, metadata);
						}
					}
				}
			};
			// From internal representation to an external structure
			Parser.prototype.getTokenRaw = function (token) {
				return this.scanner.source.slice(token.start, token.end);
			};
			Parser.prototype.convertToken = function (token) {
				var t = {
					type: token_1.TokenName[token.type],
					value: this.getTokenRaw(token)
				};
				if (this.config.range) {
					t.range = [token.start, token.end];
				}
				if (this.config.loc) {
					t.loc = {
						start: {
							line: this.startMarker.line,
							column: this.startMarker.column
						},
						end: {
							line: this.scanner.lineNumber,
							column: this.scanner.index - this.scanner.lineStart
						}
					};
				}
				if (token.type === 9 /* RegularExpression */) {
					var pattern = token.pattern;
					var flags = token.flags;
					t.regex = { pattern: pattern, flags: flags };
				}
				return t;
			};
			Parser.prototype.nextToken = function () {
				var token = this.lookahead;
				this.lastMarker.index = this.scanner.index;
				this.lastMarker.line = this.scanner.lineNumber;
				this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
				this.collectComments();
				if (this.scanner.index !== this.startMarker.index) {
					this.startMarker.index = this.scanner.index;
					this.startMarker.line = this.scanner.lineNumber;
					this.startMarker.column = this.scanner.index - this.scanner.lineStart;
				}
				var next = this.scanner.lex();
				this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
				if (next && this.context.strict && next.type === 3 /* Identifier */) {
					if (this.scanner.isStrictModeReservedWord(next.value)) {
						next.type = 4 /* Keyword */;
					}
				}
				this.lookahead = next;
				if (this.config.tokens && next.type !== 2 /* EOF */) {
					this.tokens.push(this.convertToken(next));
				}
				return token;
			};
			Parser.prototype.nextRegexToken = function () {
				this.collectComments();
				var token = this.scanner.scanRegExp();
				if (this.config.tokens) {
					// Pop the previous token, '/' or '/='
					// This is added from the lookahead token.
					this.tokens.pop();
					this.tokens.push(this.convertToken(token));
				}
				// Prime the next lookahead.
				this.lookahead = token;
				this.nextToken();
				return token;
			};
			Parser.prototype.createNode = function () {
				return {
					index: this.startMarker.index,
					line: this.startMarker.line,
					column: this.startMarker.column
				};
			};
			Parser.prototype.startNode = function (token, lastLineStart) {
				if (lastLineStart === void 0) { lastLineStart = 0; }
				var column = token.start - token.lineStart;
				var line = token.lineNumber;
				if (column < 0) {
					column += lastLineStart;
					line--;
				}
				return {
					index: token.start,
					line: line,
					column: column
				};
			};
			Parser.prototype.finalize = function (marker, node) {
				if (this.config.range) {
					node.range = [marker.index, this.lastMarker.index];
				}
				if (this.config.loc) {
					node.loc = {
						start: {
							index : marker.index,
							line: marker.line,
							column: marker.column,
						},
						end: {
							index : this.lastMarker.index,
							line: this.lastMarker.line,
							column: this.lastMarker.column
						}
					};
					if (this.config.source) {
						node.loc.source = this.config.source;
					}
				}
				if (this.delegate) {
					var metadata = {
						start: {
							line: marker.line,
							column: marker.column,
							offset: marker.index
						},
						end: {
							line: this.lastMarker.line,
							column: this.lastMarker.column,
							offset: this.lastMarker.index
						}
					};
					this.delegate(node, metadata);
				}
				return node;
			};
			// Expect the next token to match the specified punctuator.
			// If not, an exception will be thrown.
			Parser.prototype.expect = function (value) {
				var token = this.nextToken();
				if (token.type !== 7 /* Punctuator */ || token.value !== value) {
					this.throwUnexpectedToken(token);
				}
			};
			// Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
			Parser.prototype.expectCommaSeparator = function () {
				if (this.config.tolerant) {
					var token = this.lookahead;
					if (token.type === 7 /* Punctuator */ && token.value === ',') {
						this.nextToken();
					}
					else if (token.type === 7 /* Punctuator */ && token.value === ';') {
						this.nextToken();
						this.tolerateUnexpectedToken(token);
					}
					else {
						this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
					}
				}
				else {
					this.expect(',');
				}
			};
			// Expect the next token to match the specified keyword.
			// If not, an exception will be thrown.
			Parser.prototype.expectKeyword = function (keyword) {
				var token = this.nextToken();
				if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
					this.throwUnexpectedToken(token);
				}
			};
			// Return true if the next token matches the specified punctuator.
			Parser.prototype.match = function (value) {
				return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
			};
			// Return true if the next token matches the specified keyword
			Parser.prototype.matchKeyword = function (keyword) {
				return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
			};
			// Return true if the next token matches the specified contextual keyword
			// (where an identifier is sometimes a keyword depending on the context)
			Parser.prototype.matchContextualKeyword = function (keyword) {
				return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
			};
			// Return true if the next token is an assignment operator
			Parser.prototype.matchAssign = function () {
				if (this.lookahead.type !== 7 /* Punctuator */) {
					return false;
				}
				var op = this.lookahead.value;
				return op === '=' ||
					op === '*=' ||
					op === '**=' ||
					op === '/=' ||
					op === '%=' ||
					op === '+=' ||
					op === '-=' ||
					op === '<<=' ||
					op === '>>=' ||
					op === '>>>=' ||
					op === '&=' ||
					op === '^=' ||
					op === '|=';
			};
			// Cover grammar support.
			//
			// When an assignment expression position starts with an left parenthesis, the determination of the type
			// of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
			// or the first comma. This situation also defers the determination of all the expressions nested in the pair.
			//
			// There are three productions that can be parsed in a parentheses pair that needs to be determined
			// after the outermost pair is closed. They are:
			//
			//   1. AssignmentExpression
			//   2. BindingElements
			//   3. AssignmentTargets
			//
			// In order to avoid exponential backtracking, we use two flags to denote if the production can be
			// binding element or assignment target.
			//
			// The three productions have the relationship:
			//
			//   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
			//
			// with a single exception that CoverInitializedName when used directly in an Expression, generates
			// an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
			// first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
			//
			// isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
			// effect the current flags. This means the production the parser parses is only used as an expression. Therefore
			// the CoverInitializedName check is conducted.
			//
			// inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
			// the flags outside of the parser. This means the production the parser parses is used as a part of a potential
			// pattern. The CoverInitializedName check is deferred.
			Parser.prototype.isolateCoverGrammar = function (parseFunction) {
				var previousIsBindingElement = this.context.isBindingElement;
				var previousIsAssignmentTarget = this.context.isAssignmentTarget;
				var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
				this.context.isBindingElement = true;
				this.context.isAssignmentTarget = true;
				this.context.firstCoverInitializedNameError = null;
				var result = parseFunction.call(this);
				if (this.context.firstCoverInitializedNameError !== null) {
					this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
				}
				this.context.isBindingElement = previousIsBindingElement;
				this.context.isAssignmentTarget = previousIsAssignmentTarget;
				this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
				return result;
			};
			Parser.prototype.inheritCoverGrammar = function (parseFunction) {
				var previousIsBindingElement = this.context.isBindingElement;
				var previousIsAssignmentTarget = this.context.isAssignmentTarget;
				var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
				this.context.isBindingElement = true;
				this.context.isAssignmentTarget = true;
				this.context.firstCoverInitializedNameError = null;
				var result = parseFunction.call(this);
				this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
				this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
				this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
				return result;
			};
			Parser.prototype.consumeSemicolon = function () {
				if (this.match(';')) {
					this.nextToken();
				}
				else if (!this.hasLineTerminator) {
					if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
						this.throwUnexpectedToken(this.lookahead);
					}
					this.lastMarker.index = this.startMarker.index;
					this.lastMarker.line = this.startMarker.line;
					this.lastMarker.column = this.startMarker.column;
				}
			};
			// https://tc39.github.io/ecma262/#sec-primary-expression
			Parser.prototype.parsePrimaryExpression = function () {
				var node = this.createNode();
				var expr;
				var token, raw;
				switch (this.lookahead.type) {
					case 3 /* Identifier */:
						if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
							this.tolerateUnexpectedToken(this.lookahead);
						}
						expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
						break;
					case 6 /* NumericLiteral */:
					case 8 /* StringLiteral */:
						if (this.context.strict && this.lookahead.octal) {
							this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
						}
						this.context.isAssignmentTarget = false;
						this.context.isBindingElement = false;
						token = this.nextToken();
						raw = this.getTokenRaw(token);
						expr = this.finalize(node, new Node.Literal(token.value, raw));
						break;
					case 1 /* BooleanLiteral */:
						this.context.isAssignmentTarget = false;
						this.context.isBindingElement = false;
						token = this.nextToken();
						raw = this.getTokenRaw(token);
						expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
						break;
					case 5 /* NullLiteral */:
						this.context.isAssignmentTarget = false;
						this.context.isBindingElement = false;
						token = this.nextToken();
						raw = this.getTokenRaw(token);
						expr = this.finalize(node, new Node.Literal(null, raw));
						break;
					case 10 /* Template */:
						expr = this.parseTemplateLiteral();
						break;
					case 7 /* Punctuator */:
						switch (this.lookahead.value) {
							case '(':
								this.context.isBindingElement = false;
								expr = this.inheritCoverGrammar(this.parseGroupExpression);
								break;
							case '[':
								expr = this.inheritCoverGrammar(this.parseArrayInitializer);
								break;
							case '{':
								expr = this.inheritCoverGrammar(this.parseObjectInitializer);
								break;
							case '/':
							case '/=':
								this.context.isAssignmentTarget = false;
								this.context.isBindingElement = false;
								this.scanner.index = this.startMarker.index;
								token = this.nextRegexToken();
								raw = this.getTokenRaw(token);
								expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
								break;
							default:
								expr = this.throwUnexpectedToken(this.nextToken());
						}
						break;
					case 4 /* Keyword */:
						if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
							expr = this.parseIdentifierName();
						}
						else if (!this.context.strict && this.matchKeyword('let')) {
							expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
						}
						else {
							this.context.isAssignmentTarget = false;
							this.context.isBindingElement = false;
							if (this.matchKeyword('function')) {
								expr = this.parseFunctionExpression();
							}
							else if (this.matchKeyword('this')) {
								this.nextToken();
								expr = this.finalize(node, new Node.ThisExpression());
							}
							else if (this.matchKeyword('class')) {
								expr = this.parseClassExpression();
							}
							else {
								expr = this.throwUnexpectedToken(this.nextToken());
							}
						}
						break;
					default:
						expr = this.throwUnexpectedToken(this.nextToken());
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-array-initializer
			Parser.prototype.parseSpreadElement = function () {
				var node = this.createNode();
				this.expect('...');
				var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
				return this.finalize(node, new Node.SpreadElement(arg));
			};
			Parser.prototype.parseArrayInitializer = function () {
				var node = this.createNode();
				var elements = [];
				this.expect('[');
				while (!this.match(']')) {
					if (this.match(',')) {
						this.nextToken();
						elements.push(null);
					}
					else if (this.match('...')) {
						var element = this.parseSpreadElement();
						if (!this.match(']')) {
							this.context.isAssignmentTarget = false;
							this.context.isBindingElement = false;
							this.expect(',');
						}
						elements.push(element);
					}
					else {
						elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
						if (!this.match(']')) {
							this.expect(',');
						}
					}
				}
				this.expect(']');
				return this.finalize(node, new Node.ArrayExpression(elements));
			};
			// https://tc39.github.io/ecma262/#sec-object-initializer
			Parser.prototype.parsePropertyMethod = function (params) {
				this.context.isAssignmentTarget = false;
				this.context.isBindingElement = false;
				var previousStrict = this.context.strict;
				var previousAllowStrictDirective = this.context.allowStrictDirective;
				this.context.allowStrictDirective = params.simple;
				var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
				if (this.context.strict && params.firstRestricted) {
					this.tolerateUnexpectedToken(params.firstRestricted, params.message);
				}
				if (this.context.strict && params.stricted) {
					this.tolerateUnexpectedToken(params.stricted, params.message);
				}
				this.context.strict = previousStrict;
				this.context.allowStrictDirective = previousAllowStrictDirective;
				return body;
			};
			Parser.prototype.parsePropertyMethodFunction = function () {
				var isGenerator = false;
				var node = this.createNode();
				var previousAllowYield = this.context.allowYield;
				this.context.allowYield = true;
				var params = this.parseFormalParameters();
				var method = this.parsePropertyMethod(params);
				this.context.allowYield = previousAllowYield;
				return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
			};
			Parser.prototype.parsePropertyMethodAsyncFunction = function () {
				var node = this.createNode();
				var previousAllowYield = this.context.allowYield;
				var previousAwait = this.context.await;
				this.context.allowYield = false;
				this.context.await = true;
				var params = this.parseFormalParameters();
				var method = this.parsePropertyMethod(params);
				this.context.allowYield = previousAllowYield;
				this.context.await = previousAwait;
				return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
			};
			Parser.prototype.parseObjectPropertyKey = function () {
				var node = this.createNode();
				var token = this.nextToken();
				var key;
				switch (token.type) {
					case 8 /* StringLiteral */:
					case 6 /* NumericLiteral */:
						if (this.context.strict && token.octal) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
						}
						var raw = this.getTokenRaw(token);
						key = this.finalize(node, new Node.Literal(token.value, raw));
						break;
					case 3 /* Identifier */:
					case 1 /* BooleanLiteral */:
					case 5 /* NullLiteral */:
					case 4 /* Keyword */:
						key = this.finalize(node, new Node.Identifier(token.value));
						break;
					case 7 /* Punctuator */:
						if (token.value === '[') {
							key = this.isolateCoverGrammar(this.parseAssignmentExpression);
							this.expect(']');
						}
						else {
							key = this.throwUnexpectedToken(token);
						}
						break;
					default:
						key = this.throwUnexpectedToken(token);
				}
				return key;
			};
			Parser.prototype.isPropertyKey = function (key, value) {
				return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
					(key.type === syntax_1.Syntax.Literal && key.value === value);
			};
			Parser.prototype.parseObjectProperty = function (hasProto) {
				var node = this.createNode();
				var token = this.lookahead;
				var kind;
				var key = null;
				var value = null;
				var computed = false;
				var method = false;
				var shorthand = false;
				var isAsync = false;
				if (token.type === 3 /* Identifier */) {
					var id = token.value;
					this.nextToken();
					computed = this.match('[');
					isAsync = !this.hasLineTerminator && (id === 'async') &&
						!this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
					key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
				}
				else if (this.match('*')) {
					this.nextToken();
				}
				else {
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
				}
				var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
				if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
					kind = 'get';
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
					this.context.allowYield = false;
					value = this.parseGetterMethod();
				}
				else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
					kind = 'set';
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
					value = this.parseSetterMethod();
				}
				else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
					kind = 'init';
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
					value = this.parseGeneratorMethod();
					method = true;
				}
				else {
					if (!key) {
						this.throwUnexpectedToken(this.lookahead);
					}
					kind = 'init';
					if (this.match(':') && !isAsync) {
						if (!computed && this.isPropertyKey(key, '__proto__')) {
							if (hasProto.value) {
								this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
							}
							hasProto.value = true;
						}
						this.nextToken();
						value = this.inheritCoverGrammar(this.parseAssignmentExpression);
					}
					else if (this.match('(')) {
						value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
						method = true;
					}
					else if (token.type === 3 /* Identifier */) {
						var id = this.finalize(node, new Node.Identifier(token.value));
						if (this.match('=')) {
							this.context.firstCoverInitializedNameError = this.lookahead;
							this.nextToken();
							shorthand = true;
							var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
							value = this.finalize(node, new Node.AssignmentPattern(id, init));
						}
						else {
							shorthand = true;
							value = id;
						}
					}
					else {
						this.throwUnexpectedToken(this.nextToken());
					}
				}
				return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
			};
			Parser.prototype.parseObjectInitializer = function () {
				var node = this.createNode();
				this.expect('{');
				var properties = [];
				var hasProto = { value: false };
				while (!this.match('}')) {
					properties.push(this.parseObjectProperty(hasProto));
					if (!this.match('}')) {
						this.expectCommaSeparator();
					}
				}
				this.expect('}');
				return this.finalize(node, new Node.ObjectExpression(properties));
			};
			// https://tc39.github.io/ecma262/#sec-template-literals
			Parser.prototype.parseTemplateHead = function () {
				assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
				var node = this.createNode();
				var token = this.nextToken();
				var raw = token.value;
				var cooked = token.cooked;
				return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
			};
			Parser.prototype.parseTemplateElement = function () {
				if (this.lookahead.type !== 10 /* Template */) {
					this.throwUnexpectedToken();
				}
				var node = this.createNode();
				var token = this.nextToken();
				var raw = token.value;
				var cooked = token.cooked;
				return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
			};
			Parser.prototype.parseTemplateLiteral = function () {
				var node = this.createNode();
				var expressions = [];
				var quasis = [];
				var quasi = this.parseTemplateHead();
				quasis.push(quasi);
				while (!quasi.tail) {
					expressions.push(this.parseExpression());
					quasi = this.parseTemplateElement();
					quasis.push(quasi);
				}
				return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
			};
			// https://tc39.github.io/ecma262/#sec-grouping-operator
			Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
				switch (expr.type) {
					case syntax_1.Syntax.Identifier:
					case syntax_1.Syntax.MemberExpression:
					case syntax_1.Syntax.RestElement:
					case syntax_1.Syntax.AssignmentPattern:
						break;
					case syntax_1.Syntax.SpreadElement:
						expr.type = syntax_1.Syntax.RestElement;
						this.reinterpretExpressionAsPattern(expr.argument);
						break;
					case syntax_1.Syntax.ArrayExpression:
						expr.type = syntax_1.Syntax.ArrayPattern;
						for (var i = 0; i < expr.elements.length; i++) {
							if (expr.elements[i] !== null) {
								this.reinterpretExpressionAsPattern(expr.elements[i]);
							}
						}
						break;
					case syntax_1.Syntax.ObjectExpression:
						expr.type = syntax_1.Syntax.ObjectPattern;
						for (var i = 0; i < expr.properties.length; i++) {
							this.reinterpretExpressionAsPattern(expr.properties[i].value);
						}
						break;
					case syntax_1.Syntax.AssignmentExpression:
						expr.type = syntax_1.Syntax.AssignmentPattern;
						delete expr.operator;
						this.reinterpretExpressionAsPattern(expr.left);
						break;
					default:
						// Allow other node type for tolerant parsing.
						break;
				}
			};
			Parser.prototype.parseGroupExpression = function () {
				var expr;
				this.expect('(');
				if (this.match(')')) {
					this.nextToken();
					if (!this.match('=>')) {
						this.expect('=>');
					}
					expr = {
						type: ArrowParameterPlaceHolder,
						params: [],
						async: false
					};
				}
				else {
					var startToken = this.lookahead;
					var params = [];
					if (this.match('...')) {
						expr = this.parseRestElement(params);
						this.expect(')');
						if (!this.match('=>')) {
							this.expect('=>');
						}
						expr = {
							type: ArrowParameterPlaceHolder,
							params: [expr],
							async: false
						};
					}
					else {
						var arrow = false;
						this.context.isBindingElement = true;
						expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
						if (this.match(',')) {
							var expressions = [];
							this.context.isAssignmentTarget = false;
							expressions.push(expr);
							while (this.lookahead.type !== 2 /* EOF */) {
								if (!this.match(',')) {
									break;
								}
								this.nextToken();
								if (this.match(')')) {
									this.nextToken();
									for (var i = 0; i < expressions.length; i++) {
										this.reinterpretExpressionAsPattern(expressions[i]);
									}
									arrow = true;
									expr = {
										type: ArrowParameterPlaceHolder,
										params: expressions,
										async: false
									};
								}
								else if (this.match('...')) {
									if (!this.context.isBindingElement) {
										this.throwUnexpectedToken(this.lookahead);
									}
									expressions.push(this.parseRestElement(params));
									this.expect(')');
									if (!this.match('=>')) {
										this.expect('=>');
									}
									this.context.isBindingElement = false;
									for (var i = 0; i < expressions.length; i++) {
										this.reinterpretExpressionAsPattern(expressions[i]);
									}
									arrow = true;
									expr = {
										type: ArrowParameterPlaceHolder,
										params: expressions,
										async: false
									};
								}
								else {
									expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
								}
								if (arrow) {
									break;
								}
							}
							if (!arrow) {
								expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
							}
						}
						if (!arrow) {
							this.expect(')');
							if (this.match('=>')) {
								if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
									arrow = true;
									expr = {
										type: ArrowParameterPlaceHolder,
										params: [expr],
										async: false
									};
								}
								if (!arrow) {
									if (!this.context.isBindingElement) {
										this.throwUnexpectedToken(this.lookahead);
									}
									if (expr.type === syntax_1.Syntax.SequenceExpression) {
										for (var i = 0; i < expr.expressions.length; i++) {
											this.reinterpretExpressionAsPattern(expr.expressions[i]);
										}
									}
									else {
										this.reinterpretExpressionAsPattern(expr);
									}
									var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
									expr = {
										type: ArrowParameterPlaceHolder,
										params: parameters,
										async: false
									};
								}
							}
							this.context.isBindingElement = false;
						}
					}
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
			Parser.prototype.parseArguments = function () {
				this.expect('(');
				var args = [];
				if (!this.match(')')) {
					while (true) {
						var expr = this.match('...') ? this.parseSpreadElement() :
							this.isolateCoverGrammar(this.parseAssignmentExpression);
						args.push(expr);
						if (this.match(')')) {
							break;
						}
						this.expectCommaSeparator();
						if (this.match(')')) {
							break;
						}
					}
				}
				this.expect(')');
				return args;
			};
			Parser.prototype.isIdentifierName = function (token) {
				return token.type === 3 /* Identifier */ ||
					token.type === 4 /* Keyword */ ||
					token.type === 1 /* BooleanLiteral */ ||
					token.type === 5 /* NullLiteral */;
			};
			Parser.prototype.parseIdentifierName = function () {
				var node = this.createNode();
				var token = this.nextToken();
				if (!this.isIdentifierName(token)) {
					this.throwUnexpectedToken(token);
				}
				return this.finalize(node, new Node.Identifier(token.value));
			};
			Parser.prototype.parseNewExpression = function () {
				var node = this.createNode();
				var id = this.parseIdentifierName();
				assert_1.assert(id.name === 'new', 'New expression must start with `new`');
				var expr;
				if (this.match('.')) {
					this.nextToken();
					if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
						var property = this.parseIdentifierName();
						expr = new Node.MetaProperty(id, property);
					}
					else {
						this.throwUnexpectedToken(this.lookahead);
					}
				}
				else {
					var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
					var args = this.match('(') ? this.parseArguments() : [];
					expr = new Node.NewExpression(callee, args);
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
				}
				return this.finalize(node, expr);
			};
			Parser.prototype.parseAsyncArgument = function () {
				var arg = this.parseAssignmentExpression();
				this.context.firstCoverInitializedNameError = null;
				return arg;
			};
			Parser.prototype.parseAsyncArguments = function () {
				this.expect('(');
				var args = [];
				if (!this.match(')')) {
					while (true) {
						var expr = this.match('...') ? this.parseSpreadElement() :
							this.isolateCoverGrammar(this.parseAsyncArgument);
						args.push(expr);
						if (this.match(')')) {
							break;
						}
						this.expectCommaSeparator();
						if (this.match(')')) {
							break;
						}
					}
				}
				this.expect(')');
				return args;
			};
			Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
				var startToken = this.lookahead;
				var maybeAsync = this.matchContextualKeyword('async');
				var previousAllowIn = this.context.allowIn;
				this.context.allowIn = true;
				var expr;
				if (this.matchKeyword('super') && this.context.inFunctionBody) {
					expr = this.createNode();
					this.nextToken();
					expr = this.finalize(expr, new Node.Super());
					if (!this.match('(') && !this.match('.') && !this.match('[')) {
						this.throwUnexpectedToken(this.lookahead);
					}
				}
				else {
					expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
				}
				while (true) {
					if (this.match('.')) {
						this.context.isBindingElement = false;
						this.context.isAssignmentTarget = true;
						this.expect('.');
						var property = this.parseIdentifierName();
						expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
					}
					else if (this.match('(')) {
						var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
						this.context.isBindingElement = false;
						this.context.isAssignmentTarget = false;
						var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
						expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
						if (asyncArrow && this.match('=>')) {
							for (var i = 0; i < args.length; ++i) {
								this.reinterpretExpressionAsPattern(args[i]);
							}
							expr = {
								type: ArrowParameterPlaceHolder,
								params: args,
								async: true
							};
						}
					}
					else if (this.match('[')) {
						this.context.isBindingElement = false;
						this.context.isAssignmentTarget = true;
						this.expect('[');
						var property = this.isolateCoverGrammar(this.parseExpression);
						this.expect(']');
						expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
					}
					else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
						var quasi = this.parseTemplateLiteral();
						expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
					}
					else {
						break;
					}
				}
				this.context.allowIn = previousAllowIn;
				return expr;
			};
			Parser.prototype.parseSuper = function () {
				var node = this.createNode();
				this.expectKeyword('super');
				if (!this.match('[') && !this.match('.')) {
					this.throwUnexpectedToken(this.lookahead);
				}
				return this.finalize(node, new Node.Super());
			};
			Parser.prototype.parseLeftHandSideExpression = function () {
				assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
				var node = this.startNode(this.lookahead);
				var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
					this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
				while (true) {
					if (this.match('[')) {
						this.context.isBindingElement = false;
						this.context.isAssignmentTarget = true;
						this.expect('[');
						var property = this.isolateCoverGrammar(this.parseExpression);
						this.expect(']');
						expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
					}
					else if (this.match('.')) {
						this.context.isBindingElement = false;
						this.context.isAssignmentTarget = true;
						this.expect('.');
						var property = this.parseIdentifierName();
						expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
					}
					else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
						var quasi = this.parseTemplateLiteral();
						expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
					}
					else {
						break;
					}
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-update-expressions
			Parser.prototype.parseUpdateExpression = function () {
				var expr;
				var startToken = this.lookahead;
				if (this.match('++') || this.match('--')) {
					var node = this.startNode(startToken);
					var token = this.nextToken();
					expr = this.inheritCoverGrammar(this.parseUnaryExpression);
					if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
						this.tolerateError(messages_1.Messages.StrictLHSPrefix);
					}
					if (!this.context.isAssignmentTarget) {
						this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
					}
					var prefix = true;
					expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
				}
				else {
					expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
					if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
						if (this.match('++') || this.match('--')) {
							if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
								this.tolerateError(messages_1.Messages.StrictLHSPostfix);
							}
							if (!this.context.isAssignmentTarget) {
								this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
							}
							this.context.isAssignmentTarget = false;
							this.context.isBindingElement = false;
							var operator = this.nextToken().value;
							var prefix = false;
							expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
						}
					}
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-unary-operators
			Parser.prototype.parseAwaitExpression = function () {
				var node = this.createNode();
				this.nextToken();
				var argument = this.parseUnaryExpression();
				return this.finalize(node, new Node.AwaitExpression(argument));
			};
			Parser.prototype.parseUnaryExpression = function () {
				var expr;
				if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
					this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
					var node = this.startNode(this.lookahead);
					var token = this.nextToken();
					expr = this.inheritCoverGrammar(this.parseUnaryExpression);
					expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
					if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
						this.tolerateError(messages_1.Messages.StrictDelete);
					}
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
				}
				else if (this.context.await && this.matchContextualKeyword('await')) {
					expr = this.parseAwaitExpression();
				}
				else {
					expr = this.parseUpdateExpression();
				}
				return expr;
			};
			Parser.prototype.parseExponentiationExpression = function () {
				var startToken = this.lookahead;
				var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
				if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
					this.nextToken();
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
					var left = expr;
					var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
					expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-exp-operator
			// https://tc39.github.io/ecma262/#sec-multiplicative-operators
			// https://tc39.github.io/ecma262/#sec-additive-operators
			// https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
			// https://tc39.github.io/ecma262/#sec-relational-operators
			// https://tc39.github.io/ecma262/#sec-equality-operators
			// https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
			// https://tc39.github.io/ecma262/#sec-binary-logical-operators
			Parser.prototype.binaryPrecedence = function (token) {
				var op = token.value;
				var precedence;
				if (token.type === 7 /* Punctuator */) {
					precedence = this.operatorPrecedence[op] || 0;
				}
				else if (token.type === 4 /* Keyword */) {
					precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
				}
				else {
					precedence = 0;
				}
				return precedence;
			};
			Parser.prototype.parseBinaryExpression = function () {
				var startToken = this.lookahead;
				var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
				var token = this.lookahead;
				var prec = this.binaryPrecedence(token);
				if (prec > 0) {
					this.nextToken();
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
					var markers = [startToken, this.lookahead];
					var left = expr;
					var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
					var stack = [left, token.value, right];
					var precedences = [prec];
					while (true) {
						prec = this.binaryPrecedence(this.lookahead);
						if (prec <= 0) {
							break;
						}
						// Reduce: make a binary expression from the three topmost entries.
						while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
							right = stack.pop();
							var operator = stack.pop();
							precedences.pop();
							left = stack.pop();
							markers.pop();
							var node = this.startNode(markers[markers.length - 1]);
							stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
						}
						// Shift.
						stack.push(this.nextToken().value);
						precedences.push(prec);
						markers.push(this.lookahead);
						stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
					}
					// Final reduce to clean-up the stack.
					var i = stack.length - 1;
					expr = stack[i];
					var lastMarker = markers.pop();
					while (i > 1) {
						var marker = markers.pop();
						var lastLineStart = lastMarker && lastMarker.lineStart;
						var node = this.startNode(marker, lastLineStart);
						var operator = stack[i - 1];
						expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
						i -= 2;
						lastMarker = marker;
					}
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-conditional-operator
			Parser.prototype.parseConditionalExpression = function () {
				var startToken = this.lookahead;
				var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
				if (this.match('?')) {
					this.nextToken();
					var previousAllowIn = this.context.allowIn;
					this.context.allowIn = true;
					var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
					this.context.allowIn = previousAllowIn;
					this.expect(':');
					var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
					expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-assignment-operators
			Parser.prototype.checkPatternParam = function (options, param) {
				switch (param.type) {
					case syntax_1.Syntax.Identifier:
						this.validateParam(options, param, param.name);
						break;
					case syntax_1.Syntax.RestElement:
						this.checkPatternParam(options, param.argument);
						break;
					case syntax_1.Syntax.AssignmentPattern:
						this.checkPatternParam(options, param.left);
						break;
					case syntax_1.Syntax.ArrayPattern:
						for (var i = 0; i < param.elements.length; i++) {
							if (param.elements[i] !== null) {
								this.checkPatternParam(options, param.elements[i]);
							}
						}
						break;
					case syntax_1.Syntax.ObjectPattern:
						for (var i = 0; i < param.properties.length; i++) {
							this.checkPatternParam(options, param.properties[i].value);
						}
						break;
					default:
						break;
				}
				options.simple = options.simple && (param instanceof Node.Identifier);
			};
			Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
				var params = [expr];
				var options;
				var asyncArrow = false;
				switch (expr.type) {
					case syntax_1.Syntax.Identifier:
						break;
					case ArrowParameterPlaceHolder:
						params = expr.params;
						asyncArrow = expr.async;
						break;
					default:
						return null;
				}
				options = {
					simple: true,
					paramSet: {}
				};
				for (var i = 0; i < params.length; ++i) {
					var param = params[i];
					if (param.type === syntax_1.Syntax.AssignmentPattern) {
						if (param.right.type === syntax_1.Syntax.YieldExpression) {
							if (param.right.argument) {
								this.throwUnexpectedToken(this.lookahead);
							}
							param.right.type = syntax_1.Syntax.Identifier;
							param.right.name = 'yield';
							delete param.right.argument;
							delete param.right.delegate;
						}
					}
					else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
						this.throwUnexpectedToken(this.lookahead);
					}
					this.checkPatternParam(options, param);
					params[i] = param;
				}
				if (this.context.strict || !this.context.allowYield) {
					for (var i = 0; i < params.length; ++i) {
						var param = params[i];
						if (param.type === syntax_1.Syntax.YieldExpression) {
							this.throwUnexpectedToken(this.lookahead);
						}
					}
				}
				if (options.message === messages_1.Messages.StrictParamDupe) {
					var token = this.context.strict ? options.stricted : options.firstRestricted;
					this.throwUnexpectedToken(token, options.message);
				}
				return {
					simple: options.simple,
					params: params,
					stricted: options.stricted,
					firstRestricted: options.firstRestricted,
					message: options.message
				};
			};
			Parser.prototype.parseAssignmentExpression = function () {
				var expr;
				if (!this.context.allowYield && this.matchKeyword('yield')) {
					expr = this.parseYieldExpression();
				}
				else {
					var startToken = this.lookahead;
					var token = startToken;
					expr = this.parseConditionalExpression();
					if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
						if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
							var arg = this.parsePrimaryExpression();
							this.reinterpretExpressionAsPattern(arg);
							expr = {
								type: ArrowParameterPlaceHolder,
								params: [arg],
								async: true
							};
						}
					}
					if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
						// https://tc39.github.io/ecma262/#sec-arrow-function-definitions
						this.context.isAssignmentTarget = false;
						this.context.isBindingElement = false;
						var isAsync = expr.async;
						var list = this.reinterpretAsCoverFormalsList(expr);
						if (list) {
							if (this.hasLineTerminator) {
								this.tolerateUnexpectedToken(this.lookahead);
							}
							this.context.firstCoverInitializedNameError = null;
							var previousStrict = this.context.strict;
							var previousAllowStrictDirective = this.context.allowStrictDirective;
							this.context.allowStrictDirective = list.simple;
							var previousAllowYield = this.context.allowYield;
							var previousAwait = this.context.await;
							this.context.allowYield = true;
							this.context.await = isAsync;
							var node = this.startNode(startToken);
							this.expect('=>');
							var body = void 0;
							if (this.match('{')) {
								var previousAllowIn = this.context.allowIn;
								this.context.allowIn = true;
								body = this.parseFunctionSourceElements();
								this.context.allowIn = previousAllowIn;
							}
							else {
								body = this.isolateCoverGrammar(this.parseAssignmentExpression);
							}
							var expression = body.type !== syntax_1.Syntax.BlockStatement;
							if (this.context.strict && list.firstRestricted) {
								this.throwUnexpectedToken(list.firstRestricted, list.message);
							}
							if (this.context.strict && list.stricted) {
								this.tolerateUnexpectedToken(list.stricted, list.message);
							}
							expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
								this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
							this.context.strict = previousStrict;
							this.context.allowStrictDirective = previousAllowStrictDirective;
							this.context.allowYield = previousAllowYield;
							this.context.await = previousAwait;
						}
					}
					else {
						if (this.matchAssign()) {
							if (!this.context.isAssignmentTarget) {
								this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
							}
							if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
								var id = expr;
								if (this.scanner.isRestrictedWord(id.name)) {
									this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
								}
								if (this.scanner.isStrictModeReservedWord(id.name)) {
									this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
								}
							}
							if (!this.match('=')) {
								this.context.isAssignmentTarget = false;
								this.context.isBindingElement = false;
							}
							else {
								this.reinterpretExpressionAsPattern(expr);
							}
							token = this.nextToken();
							var operator = token.value;
							var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
							expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
							this.context.firstCoverInitializedNameError = null;
						}
					}
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-comma-operator
			Parser.prototype.parseExpression = function () {
				var startToken = this.lookahead;
				var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
				if (this.match(',')) {
					var expressions = [];
					expressions.push(expr);
					while (this.lookahead.type !== 2 /* EOF */) {
						if (!this.match(',')) {
							break;
						}
						this.nextToken();
						expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
					}
					expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
				}
				return expr;
			};
			// https://tc39.github.io/ecma262/#sec-block
			Parser.prototype.parseStatementListItem = function () {
				var statement;
				this.context.isAssignmentTarget = true;
				this.context.isBindingElement = true;
				if (this.lookahead.type === 4 /* Keyword */) {
					switch (this.lookahead.value) {
						case 'export':
							if (!this.context.isModule) {
								this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
							}
							statement = this.parseExportDeclaration();
							break;
						case 'import':
							if (!this.context.isModule) {
								this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
							}
							statement = this.parseImportDeclaration();
							break;
						case 'const':
							statement = this.parseLexicalDeclaration({ inFor: false });
							break;
						case 'function':
							statement = this.parseFunctionDeclaration();
							break;
						case 'class':
							statement = this.parseClassDeclaration();
							break;
						case 'let':
							statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
							break;
						default:
							statement = this.parseStatement();
							break;
					}
				}
				else {
					statement = this.parseStatement();
				}
				return statement;
			};
			Parser.prototype.parseBlock = function () {
				var node = this.createNode();
				this.expect('{');
				var block = [];
				while (true) {
					if (this.match('}')) {
						break;
					}
					block.push(this.parseStatementListItem());
				}
				this.expect('}');
				return this.finalize(node, new Node.BlockStatement(block));
			};
			// https://tc39.github.io/ecma262/#sec-let-and-const-declarations
			Parser.prototype.parseLexicalBinding = function (kind, options) {
				var node = this.createNode();
				var params = [];
				var id = this.parsePattern(params, kind);
				if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
					if (this.scanner.isRestrictedWord(id.name)) {
						this.tolerateError(messages_1.Messages.StrictVarName);
					}
				}
				var init = null;
				if (kind === 'const') {
					if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
						if (this.match('=')) {
							this.nextToken();
							init = this.isolateCoverGrammar(this.parseAssignmentExpression);
						}
						else {
							this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
						}
					}
				}
				else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
					this.expect('=');
					init = this.isolateCoverGrammar(this.parseAssignmentExpression);
				}
				return this.finalize(node, new Node.VariableDeclarator(id, init));
			};
			Parser.prototype.parseBindingList = function (kind, options) {
				var list = [this.parseLexicalBinding(kind, options)];
				while (this.match(',')) {
					this.nextToken();
					list.push(this.parseLexicalBinding(kind, options));
				}
				return list;
			};
			Parser.prototype.isLexicalDeclaration = function () {
				var state = this.scanner.saveState();
				this.scanner.scanComments();
				var next = this.scanner.lex();
				this.scanner.restoreState(state);
				return (next.type === 3 /* Identifier */) ||
					(next.type === 7 /* Punctuator */ && next.value === '[') ||
					(next.type === 7 /* Punctuator */ && next.value === '{') ||
					(next.type === 4 /* Keyword */ && next.value === 'let') ||
					(next.type === 4 /* Keyword */ && next.value === 'yield');
			};
			Parser.prototype.parseLexicalDeclaration = function (options) {
				var node = this.createNode();
				var kind = this.nextToken().value;
				assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
				var declarations = this.parseBindingList(kind, options);
				this.consumeSemicolon();
				return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
			};
			// https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
			Parser.prototype.parseBindingRestElement = function (params, kind) {
				var node = this.createNode();
				this.expect('...');
				var arg = this.parsePattern(params, kind);
				return this.finalize(node, new Node.RestElement(arg));
			};
			Parser.prototype.parseArrayPattern = function (params, kind) {
				var node = this.createNode();
				this.expect('[');
				var elements = [];
				while (!this.match(']')) {
					if (this.match(',')) {
						this.nextToken();
						elements.push(null);
					}
					else {
						if (this.match('...')) {
							elements.push(this.parseBindingRestElement(params, kind));
							break;
						}
						else {
							elements.push(this.parsePatternWithDefault(params, kind));
						}
						if (!this.match(']')) {
							this.expect(',');
						}
					}
				}
				this.expect(']');
				return this.finalize(node, new Node.ArrayPattern(elements));
			};
			Parser.prototype.parsePropertyPattern = function (params, kind) {
				var node = this.createNode();
				var computed = false;
				var shorthand = false;
				var method = false;
				var key;
				var value;
				if (this.lookahead.type === 3 /* Identifier */) {
					var keyToken = this.lookahead;
					key = this.parseVariableIdentifier();
					var init = this.finalize(node, new Node.Identifier(keyToken.value));
					if (this.match('=')) {
						params.push(keyToken);
						shorthand = true;
						this.nextToken();
						var expr = this.parseAssignmentExpression();
						value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
					}
					else if (!this.match(':')) {
						params.push(keyToken);
						shorthand = true;
						value = init;
					}
					else {
						this.expect(':');
						value = this.parsePatternWithDefault(params, kind);
					}
				}
				else {
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
					this.expect(':');
					value = this.parsePatternWithDefault(params, kind);
				}
				return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
			};
			Parser.prototype.parseObjectPattern = function (params, kind) {
				var node = this.createNode();
				var properties = [];
				this.expect('{');
				while (!this.match('}')) {
					properties.push(this.parsePropertyPattern(params, kind));
					if (!this.match('}')) {
						this.expect(',');
					}
				}
				this.expect('}');
				return this.finalize(node, new Node.ObjectPattern(properties));
			};
			Parser.prototype.parsePattern = function (params, kind) {
				var pattern;
				if (this.match('[')) {
					pattern = this.parseArrayPattern(params, kind);
				}
				else if (this.match('{')) {
					pattern = this.parseObjectPattern(params, kind);
				}
				else {
					if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
						this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
					}
					params.push(this.lookahead);
					pattern = this.parseVariableIdentifier(kind);
				}
				return pattern;
			};
			Parser.prototype.parsePatternWithDefault = function (params, kind) {
				var startToken = this.lookahead;
				var pattern = this.parsePattern(params, kind);
				if (this.match('=')) {
					this.nextToken();
					var previousAllowYield = this.context.allowYield;
					this.context.allowYield = true;
					var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
					this.context.allowYield = previousAllowYield;
					pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
				}
				return pattern;
			};
			// https://tc39.github.io/ecma262/#sec-variable-statement
			Parser.prototype.parseVariableIdentifier = function (kind) {
				var node = this.createNode();
				var token = this.nextToken();
				if (token.type === 4 /* Keyword */ && token.value === 'yield') {
					if (this.context.strict) {
						this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
					}
					else if (!this.context.allowYield) {
						this.throwUnexpectedToken(token);
					}
				}
				else if (token.type !== 3 /* Identifier */) {
					if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
						this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
					}
					else {
						if (this.context.strict || token.value !== 'let' || kind !== 'var') {
							this.throwUnexpectedToken(token);
						}
					}
				}
				else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
					this.tolerateUnexpectedToken(token);
				}
				return this.finalize(node, new Node.Identifier(token.value));
			};
			Parser.prototype.parseVariableDeclaration = function (options) {
				var node = this.createNode();
				var params = [];
				var id = this.parsePattern(params, 'var');
				if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
					if (this.scanner.isRestrictedWord(id.name)) {
						this.tolerateError(messages_1.Messages.StrictVarName);
					}
				}
				var init = null;
				if (this.match('=')) {
					this.nextToken();
					init = this.isolateCoverGrammar(this.parseAssignmentExpression);
				}
				else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
					this.expect('=');
				}
				return this.finalize(node, new Node.VariableDeclarator(id, init));
			};
			Parser.prototype.parseVariableDeclarationList = function (options) {
				var opt = { inFor: options.inFor };
				var list = [];
				list.push(this.parseVariableDeclaration(opt));
				while (this.match(',')) {
					this.nextToken();
					list.push(this.parseVariableDeclaration(opt));
				}
				return list;
			};
			Parser.prototype.parseVariableStatement = function () {
				var node = this.createNode();
				this.expectKeyword('var');
				var declarations = this.parseVariableDeclarationList({ inFor: false });
				this.consumeSemicolon();
				return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
			};
			// https://tc39.github.io/ecma262/#sec-empty-statement
			Parser.prototype.parseEmptyStatement = function () {
				var node = this.createNode();
				this.expect(';');
				return this.finalize(node, new Node.EmptyStatement());
			};
			// https://tc39.github.io/ecma262/#sec-expression-statement
			Parser.prototype.parseExpressionStatement = function () {
				var node = this.createNode();
				var expr = this.parseExpression();
				this.consumeSemicolon();
				return this.finalize(node, new Node.ExpressionStatement(expr));
			};
			// https://tc39.github.io/ecma262/#sec-if-statement
			Parser.prototype.parseIfClause = function () {
				if (this.context.strict && this.matchKeyword('function')) {
					this.tolerateError(messages_1.Messages.StrictFunction);
				}
				return this.parseStatement();
			};
			Parser.prototype.parseIfStatement = function () {
				var node = this.createNode();
				var consequent;
				var alternate = null;
				this.expectKeyword('if');
				this.expect('(');
				var test = this.parseExpression();
				if (!this.match(')') && this.config.tolerant) {
					this.tolerateUnexpectedToken(this.nextToken());
					consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
				}
				else {
					this.expect(')');
					consequent = this.parseIfClause();
					if (this.matchKeyword('else')) {
						this.nextToken();
						alternate = this.parseIfClause();
					}
				}
				return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
			};
			// https://tc39.github.io/ecma262/#sec-do-while-statement
			Parser.prototype.parseDoWhileStatement = function () {
				var node = this.createNode();
				this.expectKeyword('do');
				var previousInIteration = this.context.inIteration;
				this.context.inIteration = true;
				var body = this.parseStatement();
				this.context.inIteration = previousInIteration;
				this.expectKeyword('while');
				this.expect('(');
				var test = this.parseExpression();
				if (!this.match(')') && this.config.tolerant) {
					this.tolerateUnexpectedToken(this.nextToken());
				}
				else {
					this.expect(')');
					if (this.match(';')) {
						this.nextToken();
					}
				}
				return this.finalize(node, new Node.DoWhileStatement(body, test));
			};
			// https://tc39.github.io/ecma262/#sec-while-statement
			Parser.prototype.parseWhileStatement = function () {
				var node = this.createNode();
				var body;
				this.expectKeyword('while');
				this.expect('(');
				var test = this.parseExpression();
				if (!this.match(')') && this.config.tolerant) {
					this.tolerateUnexpectedToken(this.nextToken());
					body = this.finalize(this.createNode(), new Node.EmptyStatement());
				}
				else {
					this.expect(')');
					var previousInIteration = this.context.inIteration;
					this.context.inIteration = true;
					body = this.parseStatement();
					this.context.inIteration = previousInIteration;
				}
				return this.finalize(node, new Node.WhileStatement(test, body));
			};
			// https://tc39.github.io/ecma262/#sec-for-statement
			// https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
			Parser.prototype.parseForStatement = function () {
				var init = null;
				var test = null;
				var update = null;
				var forIn = true;
				var left, right;
				var node = this.createNode();
				this.expectKeyword('for');
				this.expect('(');
				if (this.match(';')) {
					this.nextToken();
				}
				else {
					if (this.matchKeyword('var')) {
						init = this.createNode();
						this.nextToken();
						var previousAllowIn = this.context.allowIn;
						this.context.allowIn = false;
						var declarations = this.parseVariableDeclarationList({ inFor: true });
						this.context.allowIn = previousAllowIn;
						if (declarations.length === 1 && this.matchKeyword('in')) {
							var decl = declarations[0];
							if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
								this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
							}
							init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
							this.nextToken();
							left = init;
							right = this.parseExpression();
							init = null;
						}
						else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
							init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
							this.nextToken();
							left = init;
							right = this.parseAssignmentExpression();
							init = null;
							forIn = false;
						}
						else {
							init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
							this.expect(';');
						}
					}
					else if (this.matchKeyword('const') || this.matchKeyword('let')) {
						init = this.createNode();
						var kind = this.nextToken().value;
						if (!this.context.strict && this.lookahead.value === 'in') {
							init = this.finalize(init, new Node.Identifier(kind));
							this.nextToken();
							left = init;
							right = this.parseExpression();
							init = null;
						}
						else {
							var previousAllowIn = this.context.allowIn;
							this.context.allowIn = false;
							var declarations = this.parseBindingList(kind, { inFor: true });
							this.context.allowIn = previousAllowIn;
							if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
								init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
								this.nextToken();
								left = init;
								right = this.parseExpression();
								init = null;
							}
							else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
								init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
								this.nextToken();
								left = init;
								right = this.parseAssignmentExpression();
								init = null;
								forIn = false;
							}
							else {
								this.consumeSemicolon();
								init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
							}
						}
					}
					else {
						var initStartToken = this.lookahead;
						var previousAllowIn = this.context.allowIn;
						this.context.allowIn = false;
						init = this.inheritCoverGrammar(this.parseAssignmentExpression);
						this.context.allowIn = previousAllowIn;
						if (this.matchKeyword('in')) {
							if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
								this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
							}
							this.nextToken();
							this.reinterpretExpressionAsPattern(init);
							left = init;
							right = this.parseExpression();
							init = null;
						}
						else if (this.matchContextualKeyword('of')) {
							if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
								this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
							}
							this.nextToken();
							this.reinterpretExpressionAsPattern(init);
							left = init;
							right = this.parseAssignmentExpression();
							init = null;
							forIn = false;
						}
						else {
							if (this.match(',')) {
								var initSeq = [init];
								while (this.match(',')) {
									this.nextToken();
									initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
								}
								init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
							}
							this.expect(';');
						}
					}
				}
				if (typeof left === 'undefined') {
					if (!this.match(';')) {
						test = this.parseExpression();
					}
					this.expect(';');
					if (!this.match(')')) {
						update = this.parseExpression();
					}
				}
				var body;
				if (!this.match(')') && this.config.tolerant) {
					this.tolerateUnexpectedToken(this.nextToken());
					body = this.finalize(this.createNode(), new Node.EmptyStatement());
				}
				else {
					this.expect(')');
					var previousInIteration = this.context.inIteration;
					this.context.inIteration = true;
					body = this.isolateCoverGrammar(this.parseStatement);
					this.context.inIteration = previousInIteration;
				}
				return (typeof left === 'undefined') ?
					this.finalize(node, new Node.ForStatement(init, test, update, body)) :
					forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
						this.finalize(node, new Node.ForOfStatement(left, right, body));
			};
			// https://tc39.github.io/ecma262/#sec-continue-statement
			Parser.prototype.parseContinueStatement = function () {
				var node = this.createNode();
				this.expectKeyword('continue');
				var label = null;
				if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
					var id = this.parseVariableIdentifier();
					label = id;
					var key = '$' + id.name;
					if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
						this.throwError(messages_1.Messages.UnknownLabel, id.name);
					}
				}
				this.consumeSemicolon();
				if (label === null && !this.context.inIteration) {
					this.throwError(messages_1.Messages.IllegalContinue);
				}
				return this.finalize(node, new Node.ContinueStatement(label));
			};
			// https://tc39.github.io/ecma262/#sec-break-statement
			Parser.prototype.parseBreakStatement = function () {
				var node = this.createNode();
				this.expectKeyword('break');
				var label = null;
				if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
					var id = this.parseVariableIdentifier();
					var key = '$' + id.name;
					if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
						this.throwError(messages_1.Messages.UnknownLabel, id.name);
					}
					label = id;
				}
				this.consumeSemicolon();
				if (label === null && !this.context.inIteration && !this.context.inSwitch) {
					this.throwError(messages_1.Messages.IllegalBreak);
				}
				return this.finalize(node, new Node.BreakStatement(label));
			};
			// https://tc39.github.io/ecma262/#sec-return-statement
			Parser.prototype.parseReturnStatement = function () {
				if (!this.context.inFunctionBody) {
					this.tolerateError(messages_1.Messages.IllegalReturn);
				}
				var node = this.createNode();
				this.expectKeyword('return');
				var hasArgument = (!this.match(';') && !this.match('}') &&
					!this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
					this.lookahead.type === 8 /* StringLiteral */ ||
					this.lookahead.type === 10 /* Template */;
				var argument = hasArgument ? this.parseExpression() : null;
				this.consumeSemicolon();
				return this.finalize(node, new Node.ReturnStatement(argument));
			};
			// https://tc39.github.io/ecma262/#sec-with-statement
			Parser.prototype.parseWithStatement = function () {
				if (this.context.strict) {
					this.tolerateError(messages_1.Messages.StrictModeWith);
				}
				var node = this.createNode();
				var body;
				this.expectKeyword('with');
				this.expect('(');
				var object = this.parseExpression();
				if (!this.match(')') && this.config.tolerant) {
					this.tolerateUnexpectedToken(this.nextToken());
					body = this.finalize(this.createNode(), new Node.EmptyStatement());
				}
				else {
					this.expect(')');
					body = this.parseStatement();
				}
				return this.finalize(node, new Node.WithStatement(object, body));
			};
			// https://tc39.github.io/ecma262/#sec-switch-statement
			Parser.prototype.parseSwitchCase = function () {
				var node = this.createNode();
				var test;
				if (this.matchKeyword('default')) {
					this.nextToken();
					test = null;
				}
				else {
					this.expectKeyword('case');
					test = this.parseExpression();
				}
				this.expect(':');
				var consequent = [];
				while (true) {
					if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
						break;
					}
					consequent.push(this.parseStatementListItem());
				}
				return this.finalize(node, new Node.SwitchCase(test, consequent));
			};
			Parser.prototype.parseSwitchStatement = function () {
				var node = this.createNode();
				this.expectKeyword('switch');
				this.expect('(');
				var discriminant = this.parseExpression();
				this.expect(')');
				var previousInSwitch = this.context.inSwitch;
				this.context.inSwitch = true;
				var cases = [];
				var defaultFound = false;
				this.expect('{');
				while (true) {
					if (this.match('}')) {
						break;
					}
					var clause = this.parseSwitchCase();
					if (clause.test === null) {
						if (defaultFound) {
							this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
						}
						defaultFound = true;
					}
					cases.push(clause);
				}
				this.expect('}');
				this.context.inSwitch = previousInSwitch;
				return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
			};
			// https://tc39.github.io/ecma262/#sec-labelled-statements
			Parser.prototype.parseLabelledStatement = function () {
				var node = this.createNode();
				var expr = this.parseExpression();
				var statement;
				if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
					this.nextToken();
					var id = expr;
					var key = '$' + id.name;
					if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
						this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
					}
					this.context.labelSet[key] = true;
					var body = void 0;
					if (this.matchKeyword('class')) {
						this.tolerateUnexpectedToken(this.lookahead);
						body = this.parseClassDeclaration();
					}
					else if (this.matchKeyword('function')) {
						var token = this.lookahead;
						var declaration = this.parseFunctionDeclaration();
						if (this.context.strict) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
						}
						else if (declaration.generator) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
						}
						body = declaration;
					}
					else {
						body = this.parseStatement();
					}
					delete this.context.labelSet[key];
					statement = new Node.LabeledStatement(id, body);
				}
				else {
					this.consumeSemicolon();
					statement = new Node.ExpressionStatement(expr);
				}
				return this.finalize(node, statement);
			};
			// https://tc39.github.io/ecma262/#sec-throw-statement
			Parser.prototype.parseThrowStatement = function () {
				var node = this.createNode();
				this.expectKeyword('throw');
				if (this.hasLineTerminator) {
					this.throwError(messages_1.Messages.NewlineAfterThrow);
				}
				var argument = this.parseExpression();
				this.consumeSemicolon();
				return this.finalize(node, new Node.ThrowStatement(argument));
			};
			// https://tc39.github.io/ecma262/#sec-try-statement
			Parser.prototype.parseCatchClause = function () {
				var node = this.createNode();
				this.expectKeyword('catch');
				this.expect('(');
				if (this.match(')')) {
					this.throwUnexpectedToken(this.lookahead);
				}
				var params = [];
				var param = this.parsePattern(params);
				var paramMap = {};
				for (var i = 0; i < params.length; i++) {
					var key = '$' + params[i].value;
					if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
						this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
					}
					paramMap[key] = true;
				}
				if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
					if (this.scanner.isRestrictedWord(param.name)) {
						this.tolerateError(messages_1.Messages.StrictCatchVariable);
					}
				}
				this.expect(')');
				var body = this.parseBlock();
				return this.finalize(node, new Node.CatchClause(param, body));
			};
			Parser.prototype.parseFinallyClause = function () {
				this.expectKeyword('finally');
				return this.parseBlock();
			};
			Parser.prototype.parseTryStatement = function () {
				var node = this.createNode();
				this.expectKeyword('try');
				var block = this.parseBlock();
				var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
				var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
				if (!handler && !finalizer) {
					this.throwError(messages_1.Messages.NoCatchOrFinally);
				}
				return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
			};
			// https://tc39.github.io/ecma262/#sec-debugger-statement
			Parser.prototype.parseDebuggerStatement = function () {
				var node = this.createNode();
				this.expectKeyword('debugger');
				this.consumeSemicolon();
				return this.finalize(node, new Node.DebuggerStatement());
			};
			// https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
			Parser.prototype.parseStatement = function () {
				var statement;
				switch (this.lookahead.type) {
					case 1 /* BooleanLiteral */:
					case 5 /* NullLiteral */:
					case 6 /* NumericLiteral */:
					case 8 /* StringLiteral */:
					case 10 /* Template */:
					case 9 /* RegularExpression */:
						statement = this.parseExpressionStatement();
						break;
					case 7 /* Punctuator */:
						var value = this.lookahead.value;
						if (value === '{') {
							statement = this.parseBlock();
						}
						else if (value === '(') {
							statement = this.parseExpressionStatement();
						}
						else if (value === ';') {
							statement = this.parseEmptyStatement();
						}
						else {
							statement = this.parseExpressionStatement();
						}
						break;
					case 3 /* Identifier */:
						statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
						break;
					case 4 /* Keyword */:
						switch (this.lookahead.value) {
							case 'break':
								statement = this.parseBreakStatement();
								break;
							case 'continue':
								statement = this.parseContinueStatement();
								break;
							case 'debugger':
								statement = this.parseDebuggerStatement();
								break;
							case 'do':
								statement = this.parseDoWhileStatement();
								break;
							case 'for':
								statement = this.parseForStatement();
								break;
							case 'function':
								statement = this.parseFunctionDeclaration();
								break;
							case 'if':
								statement = this.parseIfStatement();
								break;
							case 'return':
								statement = this.parseReturnStatement();
								break;
							case 'switch':
								statement = this.parseSwitchStatement();
								break;
							case 'throw':
								statement = this.parseThrowStatement();
								break;
							case 'try':
								statement = this.parseTryStatement();
								break;
							case 'var':
								statement = this.parseVariableStatement();
								break;
							case 'while':
								statement = this.parseWhileStatement();
								break;
							case 'with':
								statement = this.parseWithStatement();
								break;
							default:
								statement = this.parseExpressionStatement();
								break;
						}
						break;
					default:
						statement = this.throwUnexpectedToken(this.lookahead);
				}
				return statement;
			};
			// https://tc39.github.io/ecma262/#sec-function-definitions
			Parser.prototype.parseFunctionSourceElements = function () {
				var node = this.createNode();
				this.expect('{');
				var body = this.parseDirectivePrologues();
				var previousLabelSet = this.context.labelSet;
				var previousInIteration = this.context.inIteration;
				var previousInSwitch = this.context.inSwitch;
				var previousInFunctionBody = this.context.inFunctionBody;
				this.context.labelSet = {};
				this.context.inIteration = false;
				this.context.inSwitch = false;
				this.context.inFunctionBody = true;
				while (this.lookahead.type !== 2 /* EOF */) {
					if (this.match('}')) {
						break;
					}
					body.push(this.parseStatementListItem());
				}
				this.expect('}');
				this.context.labelSet = previousLabelSet;
				this.context.inIteration = previousInIteration;
				this.context.inSwitch = previousInSwitch;
				this.context.inFunctionBody = previousInFunctionBody;
				return this.finalize(node, new Node.BlockStatement(body));
			};
			Parser.prototype.validateParam = function (options, param, name) {
				var key = '$' + name;
				if (this.context.strict) {
					if (this.scanner.isRestrictedWord(name)) {
						options.stricted = param;
						options.message = messages_1.Messages.StrictParamName;
					}
					if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
						options.stricted = param;
						options.message = messages_1.Messages.StrictParamDupe;
					}
				}
				else if (!options.firstRestricted) {
					if (this.scanner.isRestrictedWord(name)) {
						options.firstRestricted = param;
						options.message = messages_1.Messages.StrictParamName;
					}
					else if (this.scanner.isStrictModeReservedWord(name)) {
						options.firstRestricted = param;
						options.message = messages_1.Messages.StrictReservedWord;
					}
					else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
						options.stricted = param;
						options.message = messages_1.Messages.StrictParamDupe;
					}
				}
				/* istanbul ignore next */
				if (typeof Object.defineProperty === 'function') {
					Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
				}
				else {
					options.paramSet[key] = true;
				}
			};
			Parser.prototype.parseRestElement = function (params) {
				var node = this.createNode();
				this.expect('...');
				var arg = this.parsePattern(params);
				if (this.match('=')) {
					this.throwError(messages_1.Messages.DefaultRestParameter);
				}
				if (!this.match(')')) {
					this.throwError(messages_1.Messages.ParameterAfterRestParameter);
				}
				return this.finalize(node, new Node.RestElement(arg));
			};
			Parser.prototype.parseFormalParameter = function (options) {
				var params = [];
				var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
				for (var i = 0; i < params.length; i++) {
					this.validateParam(options, params[i], params[i].value);
				}
				options.simple = options.simple && (param instanceof Node.Identifier);
				options.params.push(param);
			};
			Parser.prototype.parseFormalParameters = function (firstRestricted) {
				var options;
				options = {
					simple: true,
					params: [],
					firstRestricted: firstRestricted
				};
				this.expect('(');
				if (!this.match(')')) {
					options.paramSet = {};
					while (this.lookahead.type !== 2 /* EOF */) {
						this.parseFormalParameter(options);
						if (this.match(')')) {
							break;
						}
						this.expect(',');
						if (this.match(')')) {
							break;
						}
					}
				}
				this.expect(')');
				return {
					simple: options.simple,
					params: options.params,
					stricted: options.stricted,
					firstRestricted: options.firstRestricted,
					message: options.message
				};
			};
			Parser.prototype.matchAsyncFunction = function () {
				var match = this.matchContextualKeyword('async');
				if (match) {
					var state = this.scanner.saveState();
					this.scanner.scanComments();
					var next = this.scanner.lex();
					this.scanner.restoreState(state);
					match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
				}
				return match;
			};
			Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
				var node = this.createNode();
				var isAsync = this.matchContextualKeyword('async');
				if (isAsync) {
					this.nextToken();
				}
				this.expectKeyword('function');
				var isGenerator = isAsync ? false : this.match('*');
				if (isGenerator) {
					this.nextToken();
				}
				var message;
				var id = null;
				var firstRestricted = null;
				if (!identifierIsOptional || !this.match('(')) {
					var token = this.lookahead;
					id = this.parseVariableIdentifier();
					if (this.context.strict) {
						if (this.scanner.isRestrictedWord(token.value)) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
						}
					}
					else {
						if (this.scanner.isRestrictedWord(token.value)) {
							firstRestricted = token;
							message = messages_1.Messages.StrictFunctionName;
						}
						else if (this.scanner.isStrictModeReservedWord(token.value)) {
							firstRestricted = token;
							message = messages_1.Messages.StrictReservedWord;
						}
					}
				}
				var previousAllowAwait = this.context.await;
				var previousAllowYield = this.context.allowYield;
				this.context.await = isAsync;
				this.context.allowYield = !isGenerator;
				var formalParameters = this.parseFormalParameters(firstRestricted);
				var params = formalParameters.params;
				var stricted = formalParameters.stricted;
				firstRestricted = formalParameters.firstRestricted;
				if (formalParameters.message) {
					message = formalParameters.message;
				}
				var previousStrict = this.context.strict;
				var previousAllowStrictDirective = this.context.allowStrictDirective;
				this.context.allowStrictDirective = formalParameters.simple;
				var body = this.parseFunctionSourceElements();
				if (this.context.strict && firstRestricted) {
					this.throwUnexpectedToken(firstRestricted, message);
				}
				if (this.context.strict && stricted) {
					this.tolerateUnexpectedToken(stricted, message);
				}
				this.context.strict = previousStrict;
				this.context.allowStrictDirective = previousAllowStrictDirective;
				this.context.await = previousAllowAwait;
				this.context.allowYield = previousAllowYield;
				return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
					this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
			};
			Parser.prototype.parseFunctionExpression = function () {
				var node = this.createNode();
				var isAsync = this.matchContextualKeyword('async');
				if (isAsync) {
					this.nextToken();
				}
				this.expectKeyword('function');
				var isGenerator = isAsync ? false : this.match('*');
				if (isGenerator) {
					this.nextToken();
				}
				var message;
				var id = null;
				var firstRestricted;
				var previousAllowAwait = this.context.await;
				var previousAllowYield = this.context.allowYield;
				this.context.await = isAsync;
				this.context.allowYield = !isGenerator;
				if (!this.match('(')) {
					var token = this.lookahead;
					id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
					if (this.context.strict) {
						if (this.scanner.isRestrictedWord(token.value)) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
						}
					}
					else {
						if (this.scanner.isRestrictedWord(token.value)) {
							firstRestricted = token;
							message = messages_1.Messages.StrictFunctionName;
						}
						else if (this.scanner.isStrictModeReservedWord(token.value)) {
							firstRestricted = token;
							message = messages_1.Messages.StrictReservedWord;
						}
					}
				}
				var formalParameters = this.parseFormalParameters(firstRestricted);
				var params = formalParameters.params;
				var stricted = formalParameters.stricted;
				firstRestricted = formalParameters.firstRestricted;
				if (formalParameters.message) {
					message = formalParameters.message;
				}
				var previousStrict = this.context.strict;
				var previousAllowStrictDirective = this.context.allowStrictDirective;
				this.context.allowStrictDirective = formalParameters.simple;
				var body = this.parseFunctionSourceElements();
				if (this.context.strict && firstRestricted) {
					this.throwUnexpectedToken(firstRestricted, message);
				}
				if (this.context.strict && stricted) {
					this.tolerateUnexpectedToken(stricted, message);
				}
				this.context.strict = previousStrict;
				this.context.allowStrictDirective = previousAllowStrictDirective;
				this.context.await = previousAllowAwait;
				this.context.allowYield = previousAllowYield;
				return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
					this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
			};
			// https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
			Parser.prototype.parseDirective = function () {
				var token = this.lookahead;
				var node = this.createNode();
				var expr = this.parseExpression();
				var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
				this.consumeSemicolon();
				return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
			};
			Parser.prototype.parseDirectivePrologues = function () {
				var firstRestricted = null;
				var body = [];
				while (true) {
					var token = this.lookahead;
					if (token.type !== 8 /* StringLiteral */) {
						break;
					}
					var statement = this.parseDirective();
					body.push(statement);
					var directive = statement.directive;
					if (typeof directive !== 'string') {
						break;
					}
					if (directive === 'use strict') {
						this.context.strict = true;
						if (firstRestricted) {
							this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
						}
						if (!this.context.allowStrictDirective) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
						}
					}
					else {
						if (!firstRestricted && token.octal) {
							firstRestricted = token;
						}
					}
				}
				return body;
			};
			// https://tc39.github.io/ecma262/#sec-method-definitions
			Parser.prototype.qualifiedPropertyName = function (token) {
				switch (token.type) {
					case 3 /* Identifier */:
					case 8 /* StringLiteral */:
					case 1 /* BooleanLiteral */:
					case 5 /* NullLiteral */:
					case 6 /* NumericLiteral */:
					case 4 /* Keyword */:
						return true;
					case 7 /* Punctuator */:
						return token.value === '[';
					default:
						break;
				}
				return false;
			};
			Parser.prototype.parseGetterMethod = function () {
				var node = this.createNode();
				var isGenerator = false;
				var previousAllowYield = this.context.allowYield;
				this.context.allowYield = !isGenerator;
				var formalParameters = this.parseFormalParameters();
				if (formalParameters.params.length > 0) {
					this.tolerateError(messages_1.Messages.BadGetterArity);
				}
				var method = this.parsePropertyMethod(formalParameters);
				this.context.allowYield = previousAllowYield;
				return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
			};
			Parser.prototype.parseSetterMethod = function () {
				var node = this.createNode();
				var isGenerator = false;
				var previousAllowYield = this.context.allowYield;
				this.context.allowYield = !isGenerator;
				var formalParameters = this.parseFormalParameters();
				if (formalParameters.params.length !== 1) {
					this.tolerateError(messages_1.Messages.BadSetterArity);
				}
				else if (formalParameters.params[0] instanceof Node.RestElement) {
					this.tolerateError(messages_1.Messages.BadSetterRestParameter);
				}
				var method = this.parsePropertyMethod(formalParameters);
				this.context.allowYield = previousAllowYield;
				return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
			};
			Parser.prototype.parseGeneratorMethod = function () {
				var node = this.createNode();
				var isGenerator = true;
				var previousAllowYield = this.context.allowYield;
				this.context.allowYield = true;
				var params = this.parseFormalParameters();
				this.context.allowYield = false;
				var method = this.parsePropertyMethod(params);
				this.context.allowYield = previousAllowYield;
				return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
			};
			// https://tc39.github.io/ecma262/#sec-generator-function-definitions
			Parser.prototype.isStartOfExpression = function () {
				var start = true;
				var value = this.lookahead.value;
				switch (this.lookahead.type) {
					case 7 /* Punctuator */:
						start = (value === '[') || (value === '(') || (value === '{') ||
							(value === '+') || (value === '-') ||
							(value === '!') || (value === '~') ||
							(value === '++') || (value === '--') ||
							(value === '/') || (value === '/='); // regular expression literal
						break;
					case 4 /* Keyword */:
						start = (value === 'class') || (value === 'delete') ||
							(value === 'function') || (value === 'let') || (value === 'new') ||
							(value === 'super') || (value === 'this') || (value === 'typeof') ||
							(value === 'void') || (value === 'yield');
						break;
					default:
						break;
				}
				return start;
			};
			Parser.prototype.parseYieldExpression = function () {
				var node = this.createNode();
				this.expectKeyword('yield');
				var argument = null;
				var delegate = false;
				if (!this.hasLineTerminator) {
					var previousAllowYield = this.context.allowYield;
					this.context.allowYield = false;
					delegate = this.match('*');
					if (delegate) {
						this.nextToken();
						argument = this.parseAssignmentExpression();
					}
					else if (this.isStartOfExpression()) {
						argument = this.parseAssignmentExpression();
					}
					this.context.allowYield = previousAllowYield;
				}
				return this.finalize(node, new Node.YieldExpression(argument, delegate));
			};
			// https://tc39.github.io/ecma262/#sec-class-definitions
			Parser.prototype.parseClassElement = function (hasConstructor) {
				var token = this.lookahead;
				var node = this.createNode();
				var kind = '';
				var key = null;
				var value = null;
				var computed = false;
				var method = false;
				var isStatic = false;
				var isAsync = false;
				if (this.match('*')) {
					this.nextToken();
				}
				else {
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
					var id = key;
					if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
						token = this.lookahead;
						isStatic = true;
						computed = this.match('[');
						if (this.match('*')) {
							this.nextToken();
						}
						else {
							key = this.parseObjectPropertyKey();
						}
					}
					if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
						var punctuator = this.lookahead.value;
						if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
							isAsync = true;
							token = this.lookahead;
							key = this.parseObjectPropertyKey();
							if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
								this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
							}
						}
					}
				}
				var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
				if (token.type === 3 /* Identifier */) {
					if (token.value === 'get' && lookaheadPropertyKey) {
						kind = 'get';
						computed = this.match('[');
						key = this.parseObjectPropertyKey();
						this.context.allowYield = false;
						value = this.parseGetterMethod();
					}
					else if (token.value === 'set' && lookaheadPropertyKey) {
						kind = 'set';
						computed = this.match('[');
						key = this.parseObjectPropertyKey();
						value = this.parseSetterMethod();
					}
				}
				else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
					kind = 'init';
					computed = this.match('[');
					key = this.parseObjectPropertyKey();
					value = this.parseGeneratorMethod();
					method = true;
				}
				if (!kind && key && this.match('(')) {
					kind = 'init';
					value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
					method = true;
				}
				if (!kind) {
					this.throwUnexpectedToken(this.lookahead);
				}
				if (kind === 'init') {
					kind = 'method';
				}
				if (!computed) {
					if (isStatic && this.isPropertyKey(key, 'prototype')) {
						this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
					}
					if (!isStatic && this.isPropertyKey(key, 'constructor')) {
						if (kind !== 'method' || !method || (value && value.generator)) {
							this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
						}
						if (hasConstructor.value) {
							this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
						}
						else {
							hasConstructor.value = true;
						}
						kind = 'constructor';
					}
				}
				return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
			};
			Parser.prototype.parseClassElementList = function () {
				var body = [];
				var hasConstructor = { value: false };
				this.expect('{');
				while (!this.match('}')) {
					if (this.match(';')) {
						this.nextToken();
					}
					else {
						body.push(this.parseClassElement(hasConstructor));
					}
				}
				this.expect('}');
				return body;
			};
			Parser.prototype.parseClassBody = function () {
				var node = this.createNode();
				var elementList = this.parseClassElementList();
				return this.finalize(node, new Node.ClassBody(elementList));
			};
			Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
				var node = this.createNode();
				var previousStrict = this.context.strict;
				this.context.strict = true;
				this.expectKeyword('class');
				var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
				var superClass = null;
				if (this.matchKeyword('extends')) {
					this.nextToken();
					superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
				}
				var classBody = this.parseClassBody();
				this.context.strict = previousStrict;
				return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
			};
			Parser.prototype.parseClassExpression = function () {
				var node = this.createNode();
				var previousStrict = this.context.strict;
				this.context.strict = true;
				this.expectKeyword('class');
				var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
				var superClass = null;
				if (this.matchKeyword('extends')) {
					this.nextToken();
					superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
				}
				var classBody = this.parseClassBody();
				this.context.strict = previousStrict;
				return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
			};
			// https://tc39.github.io/ecma262/#sec-scripts
			// https://tc39.github.io/ecma262/#sec-modules
			Parser.prototype.parseModule = function () {
				this.context.strict = true;
				this.context.isModule = true;
				this.scanner.isModule = true;
				var node = this.createNode();
				var body = this.parseDirectivePrologues();
				while (this.lookahead.type !== 2 /* EOF */) {
					body.push(this.parseStatementListItem());
				}
				return this.finalize(node, new Node.Module(body));
			};
			Parser.prototype.parseScript = function () {
				var node = this.createNode();
				var body = this.parseDirectivePrologues();
				while (this.lookahead.type !== 2 /* EOF */) {
					body.push(this.parseStatementListItem());
				}
				return this.finalize(node, new Node.Script(body));
			};
			// https://tc39.github.io/ecma262/#sec-imports
			Parser.prototype.parseModuleSpecifier = function () {
				var node = this.createNode();
				if (this.lookahead.type !== 8 /* StringLiteral */) {
					this.throwError(messages_1.Messages.InvalidModuleSpecifier);
				}
				var token = this.nextToken();
				var raw = this.getTokenRaw(token);
				return this.finalize(node, new Node.Literal(token.value, raw));
			};
			// import {<foo as bar>} ...;
			Parser.prototype.parseImportSpecifier = function () {
				var node = this.createNode();
				var imported;
				var local;
				if (this.lookahead.type === 3 /* Identifier */) {
					imported = this.parseVariableIdentifier();
					local = imported;
					if (this.matchContextualKeyword('as')) {
						this.nextToken();
						local = this.parseVariableIdentifier();
					}
				}
				else {
					imported = this.parseIdentifierName();
					local = imported;
					if (this.matchContextualKeyword('as')) {
						this.nextToken();
						local = this.parseVariableIdentifier();
					}
					else {
						this.throwUnexpectedToken(this.nextToken());
					}
				}
				return this.finalize(node, new Node.ImportSpecifier(local, imported));
			};
			// {foo, bar as bas}
			Parser.prototype.parseNamedImports = function () {
				this.expect('{');
				var specifiers = [];
				while (!this.match('}')) {
					specifiers.push(this.parseImportSpecifier());
					if (!this.match('}')) {
						this.expect(',');
					}
				}
				this.expect('}');
				return specifiers;
			};
			// import <foo> ...;
			Parser.prototype.parseImportDefaultSpecifier = function () {
				var node = this.createNode();
				var local = this.parseIdentifierName();
				return this.finalize(node, new Node.ImportDefaultSpecifier(local));
			};
			// import <* as foo> ...;
			Parser.prototype.parseImportNamespaceSpecifier = function () {
				var node = this.createNode();
				this.expect('*');
				if (!this.matchContextualKeyword('as')) {
					this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
				}
				this.nextToken();
				var local = this.parseIdentifierName();
				return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
			};
			Parser.prototype.parseImportDeclaration = function () {
				if (this.context.inFunctionBody) {
					this.throwError(messages_1.Messages.IllegalImportDeclaration);
				}
				var node = this.createNode();
				this.expectKeyword('import');
				var src;
				var specifiers = [];
				if (this.lookahead.type === 8 /* StringLiteral */) {
					// import 'foo';
					src = this.parseModuleSpecifier();
				}
				else {
					if (this.match('{')) {
						// import {bar}
						specifiers = specifiers.concat(this.parseNamedImports());
					}
					else if (this.match('*')) {
						// import * as foo
						specifiers.push(this.parseImportNamespaceSpecifier());
					}
					else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
						// import foo
						specifiers.push(this.parseImportDefaultSpecifier());
						if (this.match(',')) {
							this.nextToken();
							if (this.match('*')) {
								// import foo, * as foo
								specifiers.push(this.parseImportNamespaceSpecifier());
							}
							else if (this.match('{')) {
								// import foo, {bar}
								specifiers = specifiers.concat(this.parseNamedImports());
							}
							else {
								this.throwUnexpectedToken(this.lookahead);
							}
						}
					}
					else {
						this.throwUnexpectedToken(this.nextToken());
					}
					if (!this.matchContextualKeyword('from')) {
						var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
						this.throwError(message, this.lookahead.value);
					}
					this.nextToken();
					src = this.parseModuleSpecifier();
				}
				this.consumeSemicolon();
				return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
			};
			// https://tc39.github.io/ecma262/#sec-exports
			Parser.prototype.parseExportSpecifier = function () {
				var node = this.createNode();
				var local = this.parseIdentifierName();
				var exported = local;
				if (this.matchContextualKeyword('as')) {
					this.nextToken();
					exported = this.parseIdentifierName();
				}
				return this.finalize(node, new Node.ExportSpecifier(local, exported));
			};
			Parser.prototype.parseExportDeclaration = function () {
				if (this.context.inFunctionBody) {
					this.throwError(messages_1.Messages.IllegalExportDeclaration);
				}
				var node = this.createNode();
				this.expectKeyword('export');
				var exportDeclaration;
				if (this.matchKeyword('default')) {
					// export default ...
					this.nextToken();
					if (this.matchKeyword('function')) {
						// export default function foo () {}
						// export default function () {}
						var declaration = this.parseFunctionDeclaration(true);
						exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
					}
					else if (this.matchKeyword('class')) {
						// export default class foo {}
						var declaration = this.parseClassDeclaration(true);
						exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
					}
					else if (this.matchContextualKeyword('async')) {
						// export default async function f () {}
						// export default async function () {}
						// export default async x => x
						var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
						exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
					}
					else {
						if (this.matchContextualKeyword('from')) {
							this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
						}
						// export default {};
						// export default [];
						// export default (1 + 2);
						var declaration = this.match('{') ? this.parseObjectInitializer() :
							this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
						this.consumeSemicolon();
						exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
					}
				}
				else if (this.match('*')) {
					// export * from 'foo';
					this.nextToken();
					if (!this.matchContextualKeyword('from')) {
						var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
						this.throwError(message, this.lookahead.value);
					}
					this.nextToken();
					var src = this.parseModuleSpecifier();
					this.consumeSemicolon();
					exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
				}
				else if (this.lookahead.type === 4 /* Keyword */) {
					// export var f = 1;
					var declaration = void 0;
					switch (this.lookahead.value) {
						case 'let':
						case 'const':
							declaration = this.parseLexicalDeclaration({ inFor: false });
							break;
						case 'var':
						case 'class':
						case 'function':
							declaration = this.parseStatementListItem();
							break;
						default:
							this.throwUnexpectedToken(this.lookahead);
					}
					exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
				}
				else if (this.matchAsyncFunction()) {
					var declaration = this.parseFunctionDeclaration();
					exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
				}
				else {
					var specifiers = [];
					var source = null;
					var isExportFromIdentifier = false;
					this.expect('{');
					while (!this.match('}')) {
						isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
						specifiers.push(this.parseExportSpecifier());
						if (!this.match('}')) {
							this.expect(',');
						}
					}
					this.expect('}');
					if (this.matchContextualKeyword('from')) {
						// export {default} from 'foo';
						// export {foo} from 'foo';
						this.nextToken();
						source = this.parseModuleSpecifier();
						this.consumeSemicolon();
					}
					else if (isExportFromIdentifier) {
						// export {default}; // missing fromClause
						var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
						this.throwError(message, this.lookahead.value);
					}
					else {
						// export {foo};
						this.consumeSemicolon();
					}
					exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
				}
				return exportDeclaration;
			};
			return Parser;
		}());
		exports.Parser = Parser;
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		"use strict";
		// Ensure the condition is true, otherwise throw an error.
		// This is only to have a better contract semantic, i.e. another safety net
		// to catch a logic error. The condition shall be fulfilled in normal case.
		// Do NOT use this to enforce a certain condition on any user input.
		Object.defineProperty(exports, "__esModule", { value: true });
		function assert(condition, message) {
			/* istanbul ignore if */
			if (!condition) {
				throw new Error('ASSERT: ' + message);
			}
		}
		exports.assert = assert;
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		"use strict";
		/* tslint:disable:max-classes-per-file */
		Object.defineProperty(exports, "__esModule", { value: true });
		var ErrorHandler = (function () {
			function ErrorHandler() {
				this.errors = [];
				this.tolerant = false;
			}
			ErrorHandler.prototype.recordError = function (error) {
				this.errors.push(error);
			};
			ErrorHandler.prototype.tolerate = function (error) {
				if (this.tolerant) {
					this.recordError(error);
				}
				else {
					throw error;
				}
			};
			ErrorHandler.prototype.constructError = function (msg, column) {
				var error = new Error(msg);
				try {
					throw error;
				}
				catch (base) {
					/* istanbul ignore else */
					if (Object.create && Object.defineProperty) {
						error = Object.create(base);
						Object.defineProperty(error, 'column', { value: column });
					}
				}
				/* istanbul ignore next */
				return error;
			};
			ErrorHandler.prototype.createError = function (index, line, col, description) {
				var msg = 'Line ' + line + ': ' + description;
				var error = this.constructError(msg, col);
				error.index = index;
				error.lineNumber = line;
				error.description = description;
				return error;
			};
			ErrorHandler.prototype.throwError = function (index, line, col, description) {
				throw this.createError(index, line, col, description);
			};
			ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
				var error = this.createError(index, line, col, description);
				if (this.tolerant) {
					this.recordError(error);
				}
				else {
					throw error;
				}
			};
			return ErrorHandler;
		}());
		exports.ErrorHandler = ErrorHandler;
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		// Error messages should be identical to V8.
		exports.Messages = {
			BadGetterArity: 'Getter must not have any formal parameters',
			BadSetterArity: 'Setter must have exactly one formal parameter',
			BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
			ConstructorIsAsync: 'Class constructor may not be an async method',
			ConstructorSpecialMethod: 'Class constructor may not be an accessor',
			DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
			DefaultRestParameter: 'Unexpected token =',
			DuplicateBinding: 'Duplicate binding %0',
			DuplicateConstructor: 'A class may only have one constructor',
			DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
			ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
			GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
			IllegalBreak: 'Illegal break statement',
			IllegalContinue: 'Illegal continue statement',
			IllegalExportDeclaration: 'Unexpected token',
			IllegalImportDeclaration: 'Unexpected token',
			IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
			IllegalReturn: 'Illegal return statement',
			InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
			InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
			InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
			InvalidLHSInForIn: 'Invalid left-hand side in for-in',
			InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
			InvalidModuleSpecifier: 'Unexpected token',
			InvalidRegExp: 'Invalid regular expression',
			LetInLexicalBinding: 'let is disallowed as a lexically bound name',
			MissingFromClause: 'Unexpected token',
			MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
			NewlineAfterThrow: 'Illegal newline after throw',
			NoAsAfterImportNamespace: 'Unexpected token',
			NoCatchOrFinally: 'Missing catch or finally after try',
			ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
			Redeclaration: '%0 \'%1\' has already been declared',
			StaticPrototype: 'Classes may not have static property named prototype',
			StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
			StrictDelete: 'Delete of an unqualified identifier in strict mode.',
			StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
			StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
			StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
			StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
			StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
			StrictModeWith: 'Strict mode code may not include a with statement',
			StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
			StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
			StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
			StrictReservedWord: 'Use of future reserved word in strict mode',
			StrictVarName: 'Variable name may not be eval or arguments in strict mode',
			TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
			UnexpectedEOS: 'Unexpected end of input',
			UnexpectedIdentifier: 'Unexpected identifier',
			UnexpectedNumber: 'Unexpected number',
			UnexpectedReserved: 'Unexpected reserved word',
			UnexpectedString: 'Unexpected string',
			UnexpectedTemplate: 'Unexpected quasi %0',
			UnexpectedToken: 'Unexpected token %0',
			UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
			UnknownLabel: 'Undefined label \'%0\'',
			UnterminatedRegExp: 'Invalid regular expression: missing /'
		};
	
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var assert_1 = __webpack_require__(9);
		var character_1 = __webpack_require__(4);
		var messages_1 = __webpack_require__(11);
		function hexValue(ch) {
			return '0123456789abcdef'.indexOf(ch.toLowerCase());
		}
		function octalValue(ch) {
			return '01234567'.indexOf(ch);
		}
		var Scanner = (function () {
			function Scanner(code, handler) {
				this.source = code;
				this.errorHandler = handler;
				this.trackComment = false;
				this.isModule = false;
				this.length = code.length;
				this.index = 0;
				this.lineNumber = (code.length > 0) ? 1 : 0;
				this.lineStart = 0;
				this.curlyStack = [];
			}
			Scanner.prototype.saveState = function () {
				return {
					index: this.index,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart
				};
			};
			Scanner.prototype.restoreState = function (state) {
				this.index = state.index;
				this.lineNumber = state.lineNumber;
				this.lineStart = state.lineStart;
			};
			Scanner.prototype.eof = function () {
				return this.index >= this.length;
			};
			Scanner.prototype.throwUnexpectedToken = function (message) {
				if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
				return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
			};
			Scanner.prototype.tolerateUnexpectedToken = function (message) {
				if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
				this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
			};
			// https://tc39.github.io/ecma262/#sec-comments
			Scanner.prototype.skipSingleLineComment = function (offset) {
				var comments = [];
				var start, loc;
				if (this.trackComment) {
					comments = [];
					start = this.index - offset;
					loc = {
						start: {
							line: this.lineNumber,
							column: this.index - this.lineStart - offset
						},
						end: {}
					};
				}
				while (!this.eof()) {
					var ch = this.source.charCodeAt(this.index);
					++this.index;
					if (character_1.Character.isLineTerminator(ch)) {
						if (this.trackComment) {
							loc.end = {
								line: this.lineNumber,
								column: this.index - this.lineStart - 1
							};
							var entry = {
								multiLine: false,
								slice: [start + offset, this.index - 1],
								range: [start, this.index - 1],
								loc: loc
							};
							comments.push(entry);
						}
						if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
							++this.index;
						}
						++this.lineNumber;
						this.lineStart = this.index;
						return comments;
					}
				}
				if (this.trackComment) {
					loc.end = {
						line: this.lineNumber,
						column: this.index - this.lineStart
					};
					var entry = {
						multiLine: false,
						slice: [start + offset, this.index],
						range: [start, this.index],
						loc: loc
					};
					comments.push(entry);
				}
				return comments;
			};
			Scanner.prototype.skipMultiLineComment = function () {
				var comments = [];
				var start, loc;
				if (this.trackComment) {
					comments = [];
					start = this.index - 2;
					loc = {
						start: {
							line: this.lineNumber,
							column: this.index - this.lineStart - 2
						},
						end: {}
					};
				}
				while (!this.eof()) {
					var ch = this.source.charCodeAt(this.index);
					if (character_1.Character.isLineTerminator(ch)) {
						if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
							++this.index;
						}
						++this.lineNumber;
						++this.index;
						this.lineStart = this.index;
					}
					else if (ch === 0x2A) {
						// Block comment ends with '*/'.
						if (this.source.charCodeAt(this.index + 1) === 0x2F) {
							this.index += 2;
							if (this.trackComment) {
								loc.end = {
									line: this.lineNumber,
									column: this.index - this.lineStart
								};
								var entry = {
									multiLine: true,
									slice: [start + 2, this.index - 2],
									range: [start, this.index],
									loc: loc
								};
								comments.push(entry);
							}
							return comments;
						}
						++this.index;
					}
					else {
						++this.index;
					}
				}
				// Ran off the end of the file - the whole thing is a comment
				if (this.trackComment) {
					loc.end = {
						line: this.lineNumber,
						column: this.index - this.lineStart
					};
					var entry = {
						multiLine: true,
						slice: [start + 2, this.index],
						range: [start, this.index],
						loc: loc
					};
					comments.push(entry);
				}
				this.tolerateUnexpectedToken();
				return comments;
			};
			Scanner.prototype.scanComments = function () {
				var comments;
				if (this.trackComment) {
					comments = [];
				}
				var start = (this.index === 0);
				while (!this.eof()) {
					var ch = this.source.charCodeAt(this.index);
					if (character_1.Character.isWhiteSpace(ch)) {
						++this.index;
					}
					else if (character_1.Character.isLineTerminator(ch)) {
						++this.index;
						if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
							++this.index;
						}
						++this.lineNumber;
						this.lineStart = this.index;
						start = true;
					}
					else if (ch === 0x2F) {
						ch = this.source.charCodeAt(this.index + 1);
						if (ch === 0x2F) {
							this.index += 2;
							var comment = this.skipSingleLineComment(2);
							if (this.trackComment) {
								comments = comments.concat(comment);
							}
							start = true;
						}
						else if (ch === 0x2A) {
							this.index += 2;
							var comment = this.skipMultiLineComment();
							if (this.trackComment) {
								comments = comments.concat(comment);
							}
						}
						else {
							break;
						}
					}
					else if (start && ch === 0x2D) {
						// U+003E is '>'
						if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
							// '-->' is a single-line comment
							this.index += 3;
							var comment = this.skipSingleLineComment(3);
							if (this.trackComment) {
								comments = comments.concat(comment);
							}
						}
						else {
							break;
						}
					}
					else if (ch === 0x3C && !this.isModule) {
						if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
							this.index += 4; // `<!--`
							var comment = this.skipSingleLineComment(4);
							if (this.trackComment) {
								comments = comments.concat(comment);
							}
						}
						else {
							break;
						}
					}
					else {
						break;
					}
				}
				return comments;
			};
			// https://tc39.github.io/ecma262/#sec-future-reserved-words
			Scanner.prototype.isFutureReservedWord = function (id) {
				switch (id) {
					case 'enum':
					case 'export':
					case 'import':
					case 'super':
						return true;
					default:
						return false;
				}
			};
			Scanner.prototype.isStrictModeReservedWord = function (id) {
				switch (id) {
					case 'implements':
					case 'interface':
					case 'package':
					case 'private':
					case 'protected':
					case 'public':
					case 'static':
					case 'yield':
					case 'let':
						return true;
					default:
						return false;
				}
			};
			Scanner.prototype.isRestrictedWord = function (id) {
				return id === 'eval' || id === 'arguments';
			};
			// https://tc39.github.io/ecma262/#sec-keywords
			Scanner.prototype.isKeyword = function (id) {
				switch (id.length) {
					case 2:
						return (id === 'if') || (id === 'in') || (id === 'do');
					case 3:
						return (id === 'var') || (id === 'for') || (id === 'new') ||
							(id === 'try') || (id === 'let');
					case 4:
						return (id === 'this') || (id === 'else') || (id === 'case') ||
							(id === 'void') || (id === 'with') || (id === 'enum');
					case 5:
						return (id === 'while') || (id === 'break') || (id === 'catch') ||
							(id === 'throw') || (id === 'const') || (id === 'yield') ||
							(id === 'class') || (id === 'super');
					case 6:
						return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
							(id === 'switch') || (id === 'export') || (id === 'import');
					case 7:
						return (id === 'default') || (id === 'finally') || (id === 'extends');
					case 8:
						return (id === 'function') || (id === 'continue') || (id === 'debugger');
					case 10:
						return (id === 'instanceof');
					default:
						return false;
				}
			};
			Scanner.prototype.codePointAt = function (i) {
				var cp = this.source.charCodeAt(i);
				if (cp >= 0xD800 && cp <= 0xDBFF) {
					var second = this.source.charCodeAt(i + 1);
					if (second >= 0xDC00 && second <= 0xDFFF) {
						var first = cp;
						cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
					}
				}
				return cp;
			};
			Scanner.prototype.scanHexEscape = function (prefix) {
				var len = (prefix === 'u') ? 4 : 2;
				var code = 0;
				for (var i = 0; i < len; ++i) {
					if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
						code = code * 16 + hexValue(this.source[this.index++]);
					}
					else {
						return null;
					}
				}
				return String.fromCharCode(code);
			};
			Scanner.prototype.scanUnicodeCodePointEscape = function () {
				var ch = this.source[this.index];
				var code = 0;
				// At least, one hex digit is required.
				if (ch === '}') {
					this.throwUnexpectedToken();
				}
				while (!this.eof()) {
					ch = this.source[this.index++];
					if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
						break;
					}
					code = code * 16 + hexValue(ch);
				}
				if (code > 0x10FFFF || ch !== '}') {
					this.throwUnexpectedToken();
				}
				return character_1.Character.fromCodePoint(code);
			};
			Scanner.prototype.getIdentifier = function () {
				var start = this.index++;
				while (!this.eof()) {
					var ch = this.source.charCodeAt(this.index);
					if (ch === 0x5C) {
						// Blackslash (U+005C) marks Unicode escape sequence.
						this.index = start;
						return this.getComplexIdentifier();
					}
					else if (ch >= 0xD800 && ch < 0xDFFF) {
						// Need to handle surrogate pairs.
						this.index = start;
						return this.getComplexIdentifier();
					}
					if (character_1.Character.isIdentifierPart(ch)) {
						++this.index;
					}
					else {
						break;
					}
				}
				return this.source.slice(start, this.index);
			};
			Scanner.prototype.getComplexIdentifier = function () {
				var cp = this.codePointAt(this.index);
				var id = character_1.Character.fromCodePoint(cp);
				this.index += id.length;
				// '\u' (U+005C, U+0075) denotes an escaped character.
				var ch;
				if (cp === 0x5C) {
					if (this.source.charCodeAt(this.index) !== 0x75) {
						this.throwUnexpectedToken();
					}
					++this.index;
					if (this.source[this.index] === '{') {
						++this.index;
						ch = this.scanUnicodeCodePointEscape();
					}
					else {
						ch = this.scanHexEscape('u');
						if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
							this.throwUnexpectedToken();
						}
					}
					id = ch;
				}
				while (!this.eof()) {
					cp = this.codePointAt(this.index);
					if (!character_1.Character.isIdentifierPart(cp)) {
						break;
					}
					ch = character_1.Character.fromCodePoint(cp);
					id += ch;
					this.index += ch.length;
					// '\u' (U+005C, U+0075) denotes an escaped character.
					if (cp === 0x5C) {
						id = id.substr(0, id.length - 1);
						if (this.source.charCodeAt(this.index) !== 0x75) {
							this.throwUnexpectedToken();
						}
						++this.index;
						if (this.source[this.index] === '{') {
							++this.index;
							ch = this.scanUnicodeCodePointEscape();
						}
						else {
							ch = this.scanHexEscape('u');
							if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
								this.throwUnexpectedToken();
							}
						}
						id += ch;
					}
				}
				return id;
			};
			Scanner.prototype.octalToDecimal = function (ch) {
				// \0 is not octal escape sequence
				var octal = (ch !== '0');
				var code = octalValue(ch);
				if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
					octal = true;
					code = code * 8 + octalValue(this.source[this.index++]);
					// 3 digits are only allowed when string starts
					// with 0, 1, 2, 3
					if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
						code = code * 8 + octalValue(this.source[this.index++]);
					}
				}
				return {
					code: code,
					octal: octal
				};
			};
			// https://tc39.github.io/ecma262/#sec-names-and-keywords
			Scanner.prototype.scanIdentifier = function () {
				var type;
				var start = this.index;
				// Backslash (U+005C) starts an escaped character.
				var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
				// There is no keyword or literal with only one character.
				// Thus, it must be an identifier.
				if (id.length === 1) {
					type = 3 /* Identifier */;
				}
				else if (this.isKeyword(id)) {
					type = 4 /* Keyword */;
				}
				else if (id === 'null') {
					type = 5 /* NullLiteral */;
				}
				else if (id === 'true' || id === 'false') {
					type = 1 /* BooleanLiteral */;
				}
				else {
					type = 3 /* Identifier */;
				}
				if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
					var restore = this.index;
					this.index = start;
					this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
					this.index = restore;
				}
				return {
					type: type,
					value: id,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			// https://tc39.github.io/ecma262/#sec-punctuators
			Scanner.prototype.scanPunctuator = function () {
				var start = this.index;
				// Check for most common single-character punctuators.
				var str = this.source[this.index];
				switch (str) {
					case '(':
					case '{':
						if (str === '{') {
							this.curlyStack.push('{');
						}
						++this.index;
						break;
					case '.':
						++this.index;
						if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
							// Spread operator: ...
							this.index += 2;
							str = '...';
						}
						break;
					case '}':
						++this.index;
						this.curlyStack.pop();
						break;
					case ')':
					case ';':
					case ',':
					case '[':
					case ']':
					case ':':
					case '?':
					case '~':
						++this.index;
						break;
					default:
						// 4-character punctuator.
						str = this.source.substr(this.index, 4);
						if (str === '>>>=') {
							this.index += 4;
						}
						else {
							// 3-character punctuators.
							str = str.substr(0, 3);
							if (str === '===' || str === '!==' || str === '>>>' ||
								str === '<<=' || str === '>>=' || str === '**=') {
								this.index += 3;
							}
							else {
								// 2-character punctuators.
								str = str.substr(0, 2);
								if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
									str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
									str === '++' || str === '--' || str === '<<' || str === '>>' ||
									str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
									str === '<=' || str === '>=' || str === '=>' || str === '**') {
									this.index += 2;
								}
								else {
									// 1-character punctuators.
									str = this.source[this.index];
									if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
										++this.index;
									}
								}
							}
						}
				}
				if (this.index === start) {
					this.throwUnexpectedToken();
				}
				return {
					type: 7 /* Punctuator */,
					value: str,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			// https://tc39.github.io/ecma262/#sec-literals-numeric-literals
			Scanner.prototype.scanHexLiteral = function (start) {
				var num = '';
				while (!this.eof()) {
					if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
						break;
					}
					num += this.source[this.index++];
				}
				if (num.length === 0) {
					this.throwUnexpectedToken();
				}
				if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
					this.throwUnexpectedToken();
				}
				return {
					type: 6 /* NumericLiteral */,
					value: parseInt('0x' + num, 16),
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			Scanner.prototype.scanBinaryLiteral = function (start) {
				var num = '';
				var ch;
				while (!this.eof()) {
					ch = this.source[this.index];
					if (ch !== '0' && ch !== '1') {
						break;
					}
					num += this.source[this.index++];
				}
				if (num.length === 0) {
					// only 0b or 0B
					this.throwUnexpectedToken();
				}
				if (!this.eof()) {
					ch = this.source.charCodeAt(this.index);
					/* istanbul ignore else */
					if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
						this.throwUnexpectedToken();
					}
				}
				return {
					type: 6 /* NumericLiteral */,
					value: parseInt(num, 2),
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			Scanner.prototype.scanOctalLiteral = function (prefix, start) {
				var num = '';
				var octal = false;
				if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
					octal = true;
					num = '0' + this.source[this.index++];
				}
				else {
					++this.index;
				}
				while (!this.eof()) {
					if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
						break;
					}
					num += this.source[this.index++];
				}
				if (!octal && num.length === 0) {
					// only 0o or 0O
					this.throwUnexpectedToken();
				}
				if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
					this.throwUnexpectedToken();
				}
				return {
					type: 6 /* NumericLiteral */,
					value: parseInt(num, 8),
					octal: octal,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			Scanner.prototype.isImplicitOctalLiteral = function () {
				// Implicit octal, unless there is a non-octal digit.
				// (Annex B.1.1 on Numeric Literals)
				for (var i = this.index + 1; i < this.length; ++i) {
					var ch = this.source[i];
					if (ch === '8' || ch === '9') {
						return false;
					}
					if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
						return true;
					}
				}
				return true;
			};
			Scanner.prototype.scanNumericLiteral = function () {
				var start = this.index;
				var ch = this.source[start];
				assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
				var num = '';
				if (ch !== '.') {
					num = this.source[this.index++];
					ch = this.source[this.index];
					// Hex number starts with '0x'.
					// Octal number starts with '0'.
					// Octal number in ES6 starts with '0o'.
					// Binary number in ES6 starts with '0b'.
					if (num === '0') {
						if (ch === 'x' || ch === 'X') {
							++this.index;
							return this.scanHexLiteral(start);
						}
						if (ch === 'b' || ch === 'B') {
							++this.index;
							return this.scanBinaryLiteral(start);
						}
						if (ch === 'o' || ch === 'O') {
							return this.scanOctalLiteral(ch, start);
						}
						if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
							if (this.isImplicitOctalLiteral()) {
								return this.scanOctalLiteral(ch, start);
							}
						}
					}
					while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
						num += this.source[this.index++];
					}
					ch = this.source[this.index];
				}
				if (ch === '.') {
					num += this.source[this.index++];
					while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
						num += this.source[this.index++];
					}
					ch = this.source[this.index];
				}
				if (ch === 'e' || ch === 'E') {
					num += this.source[this.index++];
					ch = this.source[this.index];
					if (ch === '+' || ch === '-') {
						num += this.source[this.index++];
					}
					if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
						while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
							num += this.source[this.index++];
						}
					}
					else {
						this.throwUnexpectedToken();
					}
				}
				if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
					this.throwUnexpectedToken();
				}
				return {
					type: 6 /* NumericLiteral */,
					value: parseFloat(num),
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			// https://tc39.github.io/ecma262/#sec-literals-string-literals
			Scanner.prototype.scanStringLiteral = function () {
				var start = this.index;
				var quote = this.source[start];
				assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
				++this.index;
				var octal = false;
				var str = '';
				while (!this.eof()) {
					var ch = this.source[this.index++];
					if (ch === quote) {
						quote = '';
						break;
					}
					else if (ch === '\\') {
						ch = this.source[this.index++];
						if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
							switch (ch) {
								case 'u':
									if (this.source[this.index] === '{') {
										++this.index;
										str += this.scanUnicodeCodePointEscape();
									}
									else {
										var unescaped_1 = this.scanHexEscape(ch);
										if (unescaped_1 === null) {
											this.throwUnexpectedToken();
										}
										str += unescaped_1;
									}
									break;
								case 'x':
									var unescaped = this.scanHexEscape(ch);
									if (unescaped === null) {
										this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
									}
									str += unescaped;
									break;
								case 'n':
									str += '\n';
									break;
								case 'r':
									str += '\r';
									break;
								case 't':
									str += '\t';
									break;
								case 'b':
									str += '\b';
									break;
								case 'f':
									str += '\f';
									break;
								case 'v':
									str += '\x0B';
									break;
								case '8':
								case '9':
									str += ch;
									this.tolerateUnexpectedToken();
									break;
								default:
									if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
										var octToDec = this.octalToDecimal(ch);
										octal = octToDec.octal || octal;
										str += String.fromCharCode(octToDec.code);
									}
									else {
										str += ch;
									}
									break;
							}
						}
						else {
							++this.lineNumber;
							if (ch === '\r' && this.source[this.index] === '\n') {
								++this.index;
							}
							this.lineStart = this.index;
						}
					}
					else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
						break;
					}
					else {
						str += ch;
					}
				}
				if (quote !== '') {
					this.index = start;
					this.throwUnexpectedToken();
				}
				return {
					type: 8 /* StringLiteral */,
					value: str,
					octal: octal,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			// https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
			Scanner.prototype.scanTemplate = function () {
				var cooked = '';
				var terminated = false;
				var start = this.index;
				var head = (this.source[start] === '`');
				var tail = false;
				var rawOffset = 2;
				++this.index;
				while (!this.eof()) {
					var ch = this.source[this.index++];
					if (ch === '`') {
						rawOffset = 1;
						tail = true;
						terminated = true;
						break;
					}
					else if (ch === '$') {
						if (this.source[this.index] === '{') {
							this.curlyStack.push('${');
							++this.index;
							terminated = true;
							break;
						}
						cooked += ch;
					}
					else if (ch === '\\') {
						ch = this.source[this.index++];
						if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
							switch (ch) {
								case 'n':
									cooked += '\n';
									break;
								case 'r':
									cooked += '\r';
									break;
								case 't':
									cooked += '\t';
									break;
								case 'u':
									if (this.source[this.index] === '{') {
										++this.index;
										cooked += this.scanUnicodeCodePointEscape();
									}
									else {
										var restore = this.index;
										var unescaped_2 = this.scanHexEscape(ch);
										if (unescaped_2 !== null) {
											cooked += unescaped_2;
										}
										else {
											this.index = restore;
											cooked += ch;
										}
									}
									break;
								case 'x':
									var unescaped = this.scanHexEscape(ch);
									if (unescaped === null) {
										this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
									}
									cooked += unescaped;
									break;
								case 'b':
									cooked += '\b';
									break;
								case 'f':
									cooked += '\f';
									break;
								case 'v':
									cooked += '\v';
									break;
								default:
									if (ch === '0') {
										if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
											// Illegal: \01 \02 and so on
											this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
										}
										cooked += '\0';
									}
									else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
										// Illegal: \1 \2
										this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
									}
									else {
										cooked += ch;
									}
									break;
							}
						}
						else {
							++this.lineNumber;
							if (ch === '\r' && this.source[this.index] === '\n') {
								++this.index;
							}
							this.lineStart = this.index;
						}
					}
					else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
						++this.lineNumber;
						if (ch === '\r' && this.source[this.index] === '\n') {
							++this.index;
						}
						this.lineStart = this.index;
						cooked += '\n';
					}
					else {
						cooked += ch;
					}
				}
				if (!terminated) {
					this.throwUnexpectedToken();
				}
				if (!head) {
					this.curlyStack.pop();
				}
				return {
					type: 10 /* Template */,
					value: this.source.slice(start + 1, this.index - rawOffset),
					cooked: cooked,
					head: head,
					tail: tail,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			// https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
			Scanner.prototype.testRegExp = function (pattern, flags) {
				// The BMP character to use as a replacement for astral symbols when
				// translating an ES6 "u"-flagged pattern to an ES5-compatible
				// approximation.
				// Note: replacing with '\uFFFF' enables false positives in unlikely
				// scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
				// pattern that would not be detected by this substitution.
				var astralSubstitute = '\uFFFF';
				var tmp = pattern;
				var self = this;
				if (flags.indexOf('u') >= 0) {
					tmp = tmp
						.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
						var codePoint = parseInt($1 || $2, 16);
						if (codePoint > 0x10FFFF) {
							self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
						}
						if (codePoint <= 0xFFFF) {
							return String.fromCharCode(codePoint);
						}
						return astralSubstitute;
					})
						.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
				}
				// First, detect invalid regular expressions.
				try {
					RegExp(tmp);
				}
				catch (e) {
					this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
				}
				// Return a regular expression object for this pattern-flag pair, or
				// `null` in case the current environment doesn't support the flags it
				// uses.
				try {
					return new RegExp(pattern, flags);
				}
				catch (exception) {
					/* istanbul ignore next */
					return null;
				}
			};
			Scanner.prototype.scanRegExpBody = function () {
				var ch = this.source[this.index];
				assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
				var str = this.source[this.index++];
				var classMarker = false;
				var terminated = false;
				while (!this.eof()) {
					ch = this.source[this.index++];
					str += ch;
					if (ch === '\\') {
						ch = this.source[this.index++];
						// https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
						if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
							this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
						}
						str += ch;
					}
					else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
						this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
					}
					else if (classMarker) {
						if (ch === ']') {
							classMarker = false;
						}
					}
					else {
						if (ch === '/') {
							terminated = true;
							break;
						}
						else if (ch === '[') {
							classMarker = true;
						}
					}
				}
				if (!terminated) {
					this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
				}
				// Exclude leading and trailing slash.
				return str.substr(1, str.length - 2);
			};
			Scanner.prototype.scanRegExpFlags = function () {
				var str = '';
				var flags = '';
				while (!this.eof()) {
					var ch = this.source[this.index];
					if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
						break;
					}
					++this.index;
					if (ch === '\\' && !this.eof()) {
						ch = this.source[this.index];
						if (ch === 'u') {
							++this.index;
							var restore = this.index;
							var char = this.scanHexEscape('u');
							if (char !== null) {
								flags += char;
								for (str += '\\u'; restore < this.index; ++restore) {
									str += this.source[restore];
								}
							}
							else {
								this.index = restore;
								flags += 'u';
								str += '\\u';
							}
							this.tolerateUnexpectedToken();
						}
						else {
							str += '\\';
							this.tolerateUnexpectedToken();
						}
					}
					else {
						flags += ch;
						str += ch;
					}
				}
				return flags;
			};
			Scanner.prototype.scanRegExp = function () {
				var start = this.index;
				var pattern = this.scanRegExpBody();
				var flags = this.scanRegExpFlags();
				var value = this.testRegExp(pattern, flags);
				return {
					type: 9 /* RegularExpression */,
					value: '',
					pattern: pattern,
					flags: flags,
					regex: value,
					lineNumber: this.lineNumber,
					lineStart: this.lineStart,
					start: start,
					end: this.index
				};
			};
			Scanner.prototype.lex = function () {
				if (this.eof()) {
					return {
						type: 2 /* EOF */,
						value: '',
						lineNumber: this.lineNumber,
						lineStart: this.lineStart,
						start: this.index,
						end: this.index
					};
				}
				var cp = this.source.charCodeAt(this.index);
				if (character_1.Character.isIdentifierStart(cp)) {
					return this.scanIdentifier();
				}
				// Very common: ( and ) and ;
				if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
					return this.scanPunctuator();
				}
				// String literal starts with single quote (U+0027) or double quote (U+0022).
				if (cp === 0x27 || cp === 0x22) {
					return this.scanStringLiteral();
				}
				// Dot (.) U+002E can also start a floating-point number, hence the need
				// to check the next character.
				if (cp === 0x2E) {
					if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
						return this.scanNumericLiteral();
					}
					return this.scanPunctuator();
				}
				if (character_1.Character.isDecimalDigit(cp)) {
					return this.scanNumericLiteral();
				}
				// Template literals start with ` (U+0060) for template head
				// or } (U+007D) for template middle or template tail.
				if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
					return this.scanTemplate();
				}
				// Possible identifier start in a surrogate pair.
				if (cp >= 0xD800 && cp < 0xDFFF) {
					if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
						return this.scanIdentifier();
					}
				}
				return this.scanPunctuator();
			};
			return Scanner;
		}());
		exports.Scanner = Scanner;
	
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.TokenName = {};
		exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
		exports.TokenName[2 /* EOF */] = '<end>';
		exports.TokenName[3 /* Identifier */] = 'Identifier';
		exports.TokenName[4 /* Keyword */] = 'Keyword';
		exports.TokenName[5 /* NullLiteral */] = 'Null';
		exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
		exports.TokenName[7 /* Punctuator */] = 'Punctuator';
		exports.TokenName[8 /* StringLiteral */] = 'String';
		exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
		exports.TokenName[10 /* Template */] = 'Template';
	
	
	/***/ },
	/* 14 */
	/***/ function(module, exports) {
	
		"use strict";
		// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.XHTMLEntities = {
			quot: '\u0022',
			amp: '\u0026',
			apos: '\u0027',
			gt: '\u003E',
			nbsp: '\u00A0',
			iexcl: '\u00A1',
			cent: '\u00A2',
			pound: '\u00A3',
			curren: '\u00A4',
			yen: '\u00A5',
			brvbar: '\u00A6',
			sect: '\u00A7',
			uml: '\u00A8',
			copy: '\u00A9',
			ordf: '\u00AA',
			laquo: '\u00AB',
			not: '\u00AC',
			shy: '\u00AD',
			reg: '\u00AE',
			macr: '\u00AF',
			deg: '\u00B0',
			plusmn: '\u00B1',
			sup2: '\u00B2',
			sup3: '\u00B3',
			acute: '\u00B4',
			micro: '\u00B5',
			para: '\u00B6',
			middot: '\u00B7',
			cedil: '\u00B8',
			sup1: '\u00B9',
			ordm: '\u00BA',
			raquo: '\u00BB',
			frac14: '\u00BC',
			frac12: '\u00BD',
			frac34: '\u00BE',
			iquest: '\u00BF',
			Agrave: '\u00C0',
			Aacute: '\u00C1',
			Acirc: '\u00C2',
			Atilde: '\u00C3',
			Auml: '\u00C4',
			Aring: '\u00C5',
			AElig: '\u00C6',
			Ccedil: '\u00C7',
			Egrave: '\u00C8',
			Eacute: '\u00C9',
			Ecirc: '\u00CA',
			Euml: '\u00CB',
			Igrave: '\u00CC',
			Iacute: '\u00CD',
			Icirc: '\u00CE',
			Iuml: '\u00CF',
			ETH: '\u00D0',
			Ntilde: '\u00D1',
			Ograve: '\u00D2',
			Oacute: '\u00D3',
			Ocirc: '\u00D4',
			Otilde: '\u00D5',
			Ouml: '\u00D6',
			times: '\u00D7',
			Oslash: '\u00D8',
			Ugrave: '\u00D9',
			Uacute: '\u00DA',
			Ucirc: '\u00DB',
			Uuml: '\u00DC',
			Yacute: '\u00DD',
			THORN: '\u00DE',
			szlig: '\u00DF',
			agrave: '\u00E0',
			aacute: '\u00E1',
			acirc: '\u00E2',
			atilde: '\u00E3',
			auml: '\u00E4',
			aring: '\u00E5',
			aelig: '\u00E6',
			ccedil: '\u00E7',
			egrave: '\u00E8',
			eacute: '\u00E9',
			ecirc: '\u00EA',
			euml: '\u00EB',
			igrave: '\u00EC',
			iacute: '\u00ED',
			icirc: '\u00EE',
			iuml: '\u00EF',
			eth: '\u00F0',
			ntilde: '\u00F1',
			ograve: '\u00F2',
			oacute: '\u00F3',
			ocirc: '\u00F4',
			otilde: '\u00F5',
			ouml: '\u00F6',
			divide: '\u00F7',
			oslash: '\u00F8',
			ugrave: '\u00F9',
			uacute: '\u00FA',
			ucirc: '\u00FB',
			uuml: '\u00FC',
			yacute: '\u00FD',
			thorn: '\u00FE',
			yuml: '\u00FF',
			OElig: '\u0152',
			oelig: '\u0153',
			Scaron: '\u0160',
			scaron: '\u0161',
			Yuml: '\u0178',
			fnof: '\u0192',
			circ: '\u02C6',
			tilde: '\u02DC',
			Alpha: '\u0391',
			Beta: '\u0392',
			Gamma: '\u0393',
			Delta: '\u0394',
			Epsilon: '\u0395',
			Zeta: '\u0396',
			Eta: '\u0397',
			Theta: '\u0398',
			Iota: '\u0399',
			Kappa: '\u039A',
			Lambda: '\u039B',
			Mu: '\u039C',
			Nu: '\u039D',
			Xi: '\u039E',
			Omicron: '\u039F',
			Pi: '\u03A0',
			Rho: '\u03A1',
			Sigma: '\u03A3',
			Tau: '\u03A4',
			Upsilon: '\u03A5',
			Phi: '\u03A6',
			Chi: '\u03A7',
			Psi: '\u03A8',
			Omega: '\u03A9',
			alpha: '\u03B1',
			beta: '\u03B2',
			gamma: '\u03B3',
			delta: '\u03B4',
			epsilon: '\u03B5',
			zeta: '\u03B6',
			eta: '\u03B7',
			theta: '\u03B8',
			iota: '\u03B9',
			kappa: '\u03BA',
			lambda: '\u03BB',
			mu: '\u03BC',
			nu: '\u03BD',
			xi: '\u03BE',
			omicron: '\u03BF',
			pi: '\u03C0',
			rho: '\u03C1',
			sigmaf: '\u03C2',
			sigma: '\u03C3',
			tau: '\u03C4',
			upsilon: '\u03C5',
			phi: '\u03C6',
			chi: '\u03C7',
			psi: '\u03C8',
			omega: '\u03C9',
			thetasym: '\u03D1',
			upsih: '\u03D2',
			piv: '\u03D6',
			ensp: '\u2002',
			emsp: '\u2003',
			thinsp: '\u2009',
			zwnj: '\u200C',
			zwj: '\u200D',
			lrm: '\u200E',
			rlm: '\u200F',
			ndash: '\u2013',
			mdash: '\u2014',
			lsquo: '\u2018',
			rsquo: '\u2019',
			sbquo: '\u201A',
			ldquo: '\u201C',
			rdquo: '\u201D',
			bdquo: '\u201E',
			dagger: '\u2020',
			Dagger: '\u2021',
			bull: '\u2022',
			hellip: '\u2026',
			permil: '\u2030',
			prime: '\u2032',
			Prime: '\u2033',
			lsaquo: '\u2039',
			rsaquo: '\u203A',
			oline: '\u203E',
			frasl: '\u2044',
			euro: '\u20AC',
			image: '\u2111',
			weierp: '\u2118',
			real: '\u211C',
			trade: '\u2122',
			alefsym: '\u2135',
			larr: '\u2190',
			uarr: '\u2191',
			rarr: '\u2192',
			darr: '\u2193',
			harr: '\u2194',
			crarr: '\u21B5',
			lArr: '\u21D0',
			uArr: '\u21D1',
			rArr: '\u21D2',
			dArr: '\u21D3',
			hArr: '\u21D4',
			forall: '\u2200',
			part: '\u2202',
			exist: '\u2203',
			empty: '\u2205',
			nabla: '\u2207',
			isin: '\u2208',
			notin: '\u2209',
			ni: '\u220B',
			prod: '\u220F',
			sum: '\u2211',
			minus: '\u2212',
			lowast: '\u2217',
			radic: '\u221A',
			prop: '\u221D',
			infin: '\u221E',
			ang: '\u2220',
			and: '\u2227',
			or: '\u2228',
			cap: '\u2229',
			cup: '\u222A',
			int: '\u222B',
			there4: '\u2234',
			sim: '\u223C',
			cong: '\u2245',
			asymp: '\u2248',
			ne: '\u2260',
			equiv: '\u2261',
			le: '\u2264',
			ge: '\u2265',
			sub: '\u2282',
			sup: '\u2283',
			nsub: '\u2284',
			sube: '\u2286',
			supe: '\u2287',
			oplus: '\u2295',
			otimes: '\u2297',
			perp: '\u22A5',
			sdot: '\u22C5',
			lceil: '\u2308',
			rceil: '\u2309',
			lfloor: '\u230A',
			rfloor: '\u230B',
			loz: '\u25CA',
			spades: '\u2660',
			clubs: '\u2663',
			hearts: '\u2665',
			diams: '\u2666',
			lang: '\u27E8',
			rang: '\u27E9'
		};
	
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		Object.defineProperty(exports, "__esModule", { value: true });
		var error_handler_1 = __webpack_require__(10);
		var scanner_1 = __webpack_require__(12);
		var token_1 = __webpack_require__(13);
		var Reader = (function () {
			function Reader() {
				this.values = [];
				this.curly = this.paren = -1;
			}
			// A function following one of those tokens is an expression.
			Reader.prototype.beforeFunctionExpression = function (t) {
				return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
					'return', 'case', 'delete', 'throw', 'void',
					// assignment operators
					'=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
					'&=', '|=', '^=', ',',
					// binary/unary operators
					'+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
					'|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
					'<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
			};
			// Determine if forward slash (/) is an operator or part of a regular expression
			// https://github.com/mozilla/sweet.js/wiki/design
			Reader.prototype.isRegexStart = function () {
				var previous = this.values[this.values.length - 1];
				var regex = (previous !== null);
				switch (previous) {
					case 'this':
					case ']':
						regex = false;
						break;
					case ')':
						var keyword = this.values[this.paren - 1];
						regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
						break;
					case '}':
						// Dividing a function by anything makes little sense,
						// but we have to check for that.
						regex = false;
						if (this.values[this.curly - 3] === 'function') {
							// Anonymous function, e.g. function(){} /42
							var check = this.values[this.curly - 4];
							regex = check ? !this.beforeFunctionExpression(check) : false;
						}
						else if (this.values[this.curly - 4] === 'function') {
							// Named function, e.g. function f(){} /42/
							var check = this.values[this.curly - 5];
							regex = check ? !this.beforeFunctionExpression(check) : true;
						}
						break;
					default:
						break;
				}
				return regex;
			};
			Reader.prototype.push = function (token) {
				if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
					if (token.value === '{') {
						this.curly = this.values.length;
					}
					else if (token.value === '(') {
						this.paren = this.values.length;
					}
					this.values.push(token.value);
				}
				else {
					this.values.push(null);
				}
			};
			return Reader;
		}());
		var Tokenizer = (function () {
			function Tokenizer(code, config) {
				this.errorHandler = new error_handler_1.ErrorHandler();
				this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
				this.scanner = new scanner_1.Scanner(code, this.errorHandler);
				this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
				this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
				this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
				this.buffer = [];
				this.reader = new Reader();
			}
			Tokenizer.prototype.errors = function () {
				return this.errorHandler.errors;
			};
			Tokenizer.prototype.getNextToken = function () {
				if (this.buffer.length === 0) {
					var comments = this.scanner.scanComments();
					if (this.scanner.trackComment) {
						for (var i = 0; i < comments.length; ++i) {
							var e = comments[i];
							var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
							var comment = {
								type: e.multiLine ? 'BlockComment' : 'LineComment',
								value: value
							};
							if (this.trackRange) {
								comment.range = e.range;
							}
							if (this.trackLoc) {
								comment.loc = e.loc;
							}
							this.buffer.push(comment);
						}
					}
					if (!this.scanner.eof()) {
						var loc = void 0;
						if (this.trackLoc) {
							loc = {
								start: {
									line: this.scanner.lineNumber,
									column: this.scanner.index - this.scanner.lineStart
								},
								end: {}
							};
						}
						var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
						var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
						this.reader.push(token);
						var entry = {
							type: token_1.TokenName[token.type],
							value: this.scanner.source.slice(token.start, token.end)
						};
						if (this.trackRange) {
							entry.range = [token.start, token.end];
						}
						if (this.trackLoc) {
							loc.end = {
								line: this.scanner.lineNumber,
								column: this.scanner.index - this.scanner.lineStart
							};
							entry.loc = loc;
						}
						if (token.type === 9 /* RegularExpression */) {
							var pattern = token.pattern;
							var flags = token.flags;
							entry.regex = { pattern: pattern, flags: flags };
						}
						this.buffer.push(entry);
					}
				}
				return this.buffer.shift();
			};
			return Tokenizer;
		}());
		exports.Tokenizer = Tokenizer;
	
	
	/***/ }
	/******/ ])
	});
	;

var JsExpression = (function () {
	"use strict";

	function peg$subclass(child, parent) {
		function ctor() { this.constructor = child; }
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
	}

	function peg$SyntaxError(message, expected, found, location) {
		this.message = message;
		this.expected = expected;
		this.found = found;
		this.location = location;
		this.name = "SyntaxError";

		if (typeof Error.captureStackTrace === "function") {
			Error.captureStackTrace(this, peg$SyntaxError);
		}
	}

	peg$subclass(peg$SyntaxError, Error);

	peg$SyntaxError.buildMessage = function (expected, found) {
		var DESCRIBE_EXPECTATION_FNS = {
			literal: function (expectation) {
				return "\"" + literalEscape(expectation.text) + "\"";
			},

			"class": function (expectation) {
				var escapedParts = "",
					i;

				for (i = 0; i < expectation.parts.length; i++) {
					escapedParts += expectation.parts[i] instanceof Array
						? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
						: classEscape(expectation.parts[i]);
				}

				return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
			},

			any: function (expectation) {
				return "any character";
			},

			end: function (expectation) {
				return "end of input";
			},

			other: function (expectation) {
				return expectation.description;
			}
		};

		function hex(ch) {
			return ch.charCodeAt(0).toString(16).toUpperCase();
		}

		function literalEscape(s) {
			return s
				.replace(/\\/g, '\\\\')
				.replace(/"/g, '\\"')
				.replace(/\0/g, '\\0')
				.replace(/\t/g, '\\t')
				.replace(/\n/g, '\\n')
				.replace(/\r/g, '\\r')
				.replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
				.replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
		}

		function classEscape(s) {
			return s
				.replace(/\\/g, '\\\\')
				.replace(/\]/g, '\\]')
				.replace(/\^/g, '\\^')
				.replace(/-/g, '\\-')
				.replace(/\0/g, '\\0')
				.replace(/\t/g, '\\t')
				.replace(/\n/g, '\\n')
				.replace(/\r/g, '\\r')
				.replace(/[\x00-\x0F]/g, function (ch) { return '\\x0' + hex(ch); })
				.replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return '\\x' + hex(ch); });
		}

		function describeExpectation(expectation) {
			return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
		}

		function describeExpected(expected) {
			var descriptions = new Array(expected.length),
				i, j;

			for (i = 0; i < expected.length; i++) {
				descriptions[i] = describeExpectation(expected[i]);
			}

			descriptions.sort();

			if (descriptions.length > 0) {
				for (i = 1, j = 1; i < descriptions.length; i++) {
					if (descriptions[i - 1] !== descriptions[i]) {
						descriptions[j] = descriptions[i];
						j++;
					}
				}
				descriptions.length = j;
			}

			switch (descriptions.length) {
				case 1:
					return descriptions[0];

				case 2:
					return descriptions[0] + " or " + descriptions[1];

				default:
					return descriptions.slice(0, -1).join(", ")
						+ ", or "
						+ descriptions[descriptions.length - 1];
			}
		}

		function describeFound(found) {
			return found ? "\"" + literalEscape(found) + "\"" : "end of input";
		}

		return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
	};

	function peg$parse(input, options) {
		options = options !== void 0 ? options : {};

		var peg$FAILED = {},

			peg$startRuleIndices = { Start: 0 },
			peg$startRuleIndex = 0,

			peg$consts = [
				function (c, d) { return [c, d.join("")] },
				"{{",
				peg$literalExpectation("{{", false),
				"}}",
				peg$literalExpectation("}}", false),
				function (program) { var txt = text(); return txt.substring(2, txt.length - 2); },
				peg$anyExpectation(),
				peg$otherExpectation("whitespace"),
				"\t",
				peg$literalExpectation("\t", false),
				"\x0B",
				peg$literalExpectation("\x0B", false),
				"\f",
				peg$literalExpectation("\f", false),
				" ",
				peg$literalExpectation(" ", false),
				"\xA0",
				peg$literalExpectation("\xA0", false),
				"\uFEFF",
				peg$literalExpectation("\uFEFF", false),
				/^[\n\r\u2028\u2029]/,
				peg$classExpectation(["\n", "\r", "\u2028", "\u2029"], false, false),
				peg$otherExpectation("end of line"),
				"\n",
				peg$literalExpectation("\n", false),
				"\r\n",
				peg$literalExpectation("\r\n", false),
				"\r",
				peg$literalExpectation("\r", false),
				"\u2028",
				peg$literalExpectation("\u2028", false),
				"\u2029",
				peg$literalExpectation("\u2029", false),
				peg$otherExpectation("comment"),
				"/*",
				peg$literalExpectation("/*", false),
				"*/",
				peg$literalExpectation("*/", false),
				"//",
				peg$literalExpectation("//", false),
				function (name) { return name; },
				peg$otherExpectation("identifier"),
				function (head, tail) {
					return {
						type: "Identifier",
						name: head + tail.join("")
					};
				},
				"$",
				peg$literalExpectation("$", false),
				"_",
				peg$literalExpectation("_", false),
				"\\",
				peg$literalExpectation("\\", false),
				function (sequence) { return sequence; },
				"\u200C",
				peg$literalExpectation("\u200C", false),
				"\u200D",
				peg$literalExpectation("\u200D", false),
				function () { return { type: "Literal", value: null }; },
				function () { return { type: "Literal", value: true }; },
				function () { return { type: "Literal", value: false }; },
				peg$otherExpectation("number"),
				function (literal) {
					return literal;
				},
				".",
				peg$literalExpectation(".", false),
				function () {
					return { type: "Literal", value: parseFloat(text()) };
				},
				"0",
				peg$literalExpectation("0", false),
				/^[0-9]/,
				peg$classExpectation([["0", "9"]], false, false),
				/^[1-9]/,
				peg$classExpectation([["1", "9"]], false, false),
				"e",
				peg$literalExpectation("e", true),
				/^[+\-]/,
				peg$classExpectation(["+", "-"], false, false),
				"0x",
				peg$literalExpectation("0x", true),
				function (digits) {
					return { type: "Literal", value: parseInt(digits, 16) };
				},
				/^[0-9a-f]/i,
				peg$classExpectation([["0", "9"], ["a", "f"]], false, true),
				peg$otherExpectation("string"),
				"\"",
				peg$literalExpectation("\"", false),
				function (chars) {
					return { type: "Literal", value: chars.join("") };
				},
				"'",
				peg$literalExpectation("'", false),
				function () { return text(); },
				function () { return ""; },
				function () { return "\0"; },
				"b",
				peg$literalExpectation("b", false),
				function () { return "\b"; },
				"f",
				peg$literalExpectation("f", false),
				function () { return "\f"; },
				"n",
				peg$literalExpectation("n", false),
				function () { return "\n"; },
				"r",
				peg$literalExpectation("r", false),
				function () { return "\r"; },
				"t",
				peg$literalExpectation("t", false),
				function () { return "\t"; },
				"v",
				peg$literalExpectation("v", false),
				function () { return "\v"; },
				"x",
				peg$literalExpectation("x", false),
				"u",
				peg$literalExpectation("u", false),
				function (digits) {
					return String.fromCharCode(parseInt(digits, 16));
				},
				peg$otherExpectation("regular expression"),
				"/",
				peg$literalExpectation("/", false),
				function (pattern, flags) {
					var value;

					try {
						value = new RegExp(pattern, flags);
					} catch (e) {
						error(e.message);
					}

					return { type: "Literal", value: value };
				},
				/^[*\\\/[]/,
				peg$classExpectation(["*", "\\", "/", "["], false, false),
				/^[\\\/[]/,
				peg$classExpectation(["\\", "/", "["], false, false),
				"[",
				peg$literalExpectation("[", false),
				"]",
				peg$literalExpectation("]", false),
				/^[\]\\]/,
				peg$classExpectation(["]", "\\"], false, false),
				/^[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137-\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148-\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C-\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA-\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9-\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC-\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF-\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F-\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0-\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB-\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE-\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6-\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FC7\u1FD0-\u1FD3\u1FD6-\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6-\u1FF7\u210A\u210E-\u210F\u2113\u212F\u2134\u2139\u213C-\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65-\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73-\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3-\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]/,
				peg$classExpectation([["a", "z"], "\xB5", ["\xDF", "\xF6"], ["\xF8", "\xFF"], "\u0101", "\u0103", "\u0105", "\u0107", "\u0109", "\u010B", "\u010D", "\u010F", "\u0111", "\u0113", "\u0115", "\u0117", "\u0119", "\u011B", "\u011D", "\u011F", "\u0121", "\u0123", "\u0125", "\u0127", "\u0129", "\u012B", "\u012D", "\u012F", "\u0131", "\u0133", "\u0135", ["\u0137", "\u0138"], "\u013A", "\u013C", "\u013E", "\u0140", "\u0142", "\u0144", "\u0146", ["\u0148", "\u0149"], "\u014B", "\u014D", "\u014F", "\u0151", "\u0153", "\u0155", "\u0157", "\u0159", "\u015B", "\u015D", "\u015F", "\u0161", "\u0163", "\u0165", "\u0167", "\u0169", "\u016B", "\u016D", "\u016F", "\u0171", "\u0173", "\u0175", "\u0177", "\u017A", "\u017C", ["\u017E", "\u0180"], "\u0183", "\u0185", "\u0188", ["\u018C", "\u018D"], "\u0192", "\u0195", ["\u0199", "\u019B"], "\u019E", "\u01A1", "\u01A3", "\u01A5", "\u01A8", ["\u01AA", "\u01AB"], "\u01AD", "\u01B0", "\u01B4", "\u01B6", ["\u01B9", "\u01BA"], ["\u01BD", "\u01BF"], "\u01C6", "\u01C9", "\u01CC", "\u01CE", "\u01D0", "\u01D2", "\u01D4", "\u01D6", "\u01D8", "\u01DA", ["\u01DC", "\u01DD"], "\u01DF", "\u01E1", "\u01E3", "\u01E5", "\u01E7", "\u01E9", "\u01EB", "\u01ED", ["\u01EF", "\u01F0"], "\u01F3", "\u01F5", "\u01F9", "\u01FB", "\u01FD", "\u01FF", "\u0201", "\u0203", "\u0205", "\u0207", "\u0209", "\u020B", "\u020D", "\u020F", "\u0211", "\u0213", "\u0215", "\u0217", "\u0219", "\u021B", "\u021D", "\u021F", "\u0221", "\u0223", "\u0225", "\u0227", "\u0229", "\u022B", "\u022D", "\u022F", "\u0231", ["\u0233", "\u0239"], "\u023C", ["\u023F", "\u0240"], "\u0242", "\u0247", "\u0249", "\u024B", "\u024D", ["\u024F", "\u0293"], ["\u0295", "\u02AF"], "\u0371", "\u0373", "\u0377", ["\u037B", "\u037D"], "\u0390", ["\u03AC", "\u03CE"], ["\u03D0", "\u03D1"], ["\u03D5", "\u03D7"], "\u03D9", "\u03DB", "\u03DD", "\u03DF", "\u03E1", "\u03E3", "\u03E5", "\u03E7", "\u03E9", "\u03EB", "\u03ED", ["\u03EF", "\u03F3"], "\u03F5", "\u03F8", ["\u03FB", "\u03FC"], ["\u0430", "\u045F"], "\u0461", "\u0463", "\u0465", "\u0467", "\u0469", "\u046B", "\u046D", "\u046F", "\u0471", "\u0473", "\u0475", "\u0477", "\u0479", "\u047B", "\u047D", "\u047F", "\u0481", "\u048B", "\u048D", "\u048F", "\u0491", "\u0493", "\u0495", "\u0497", "\u0499", "\u049B", "\u049D", "\u049F", "\u04A1", "\u04A3", "\u04A5", "\u04A7", "\u04A9", "\u04AB", "\u04AD", "\u04AF", "\u04B1", "\u04B3", "\u04B5", "\u04B7", "\u04B9", "\u04BB", "\u04BD", "\u04BF", "\u04C2", "\u04C4", "\u04C6", "\u04C8", "\u04CA", "\u04CC", ["\u04CE", "\u04CF"], "\u04D1", "\u04D3", "\u04D5", "\u04D7", "\u04D9", "\u04DB", "\u04DD", "\u04DF", "\u04E1", "\u04E3", "\u04E5", "\u04E7", "\u04E9", "\u04EB", "\u04ED", "\u04EF", "\u04F1", "\u04F3", "\u04F5", "\u04F7", "\u04F9", "\u04FB", "\u04FD", "\u04FF", "\u0501", "\u0503", "\u0505", "\u0507", "\u0509", "\u050B", "\u050D", "\u050F", "\u0511", "\u0513", "\u0515", "\u0517", "\u0519", "\u051B", "\u051D", "\u051F", "\u0521", "\u0523", "\u0525", "\u0527", "\u0529", "\u052B", "\u052D", "\u052F", ["\u0560", "\u0588"], ["\u10D0", "\u10FA"], ["\u10FD", "\u10FF"], ["\u13F8", "\u13FD"], ["\u1C80", "\u1C88"], ["\u1D00", "\u1D2B"], ["\u1D6B", "\u1D77"], ["\u1D79", "\u1D9A"], "\u1E01", "\u1E03", "\u1E05", "\u1E07", "\u1E09", "\u1E0B", "\u1E0D", "\u1E0F", "\u1E11", "\u1E13", "\u1E15", "\u1E17", "\u1E19", "\u1E1B", "\u1E1D", "\u1E1F", "\u1E21", "\u1E23", "\u1E25", "\u1E27", "\u1E29", "\u1E2B", "\u1E2D", "\u1E2F", "\u1E31", "\u1E33", "\u1E35", "\u1E37", "\u1E39", "\u1E3B", "\u1E3D", "\u1E3F", "\u1E41", "\u1E43", "\u1E45", "\u1E47", "\u1E49", "\u1E4B", "\u1E4D", "\u1E4F", "\u1E51", "\u1E53", "\u1E55", "\u1E57", "\u1E59", "\u1E5B", "\u1E5D", "\u1E5F", "\u1E61", "\u1E63", "\u1E65", "\u1E67", "\u1E69", "\u1E6B", "\u1E6D", "\u1E6F", "\u1E71", "\u1E73", "\u1E75", "\u1E77", "\u1E79", "\u1E7B", "\u1E7D", "\u1E7F", "\u1E81", "\u1E83", "\u1E85", "\u1E87", "\u1E89", "\u1E8B", "\u1E8D", "\u1E8F", "\u1E91", "\u1E93", ["\u1E95", "\u1E9D"], "\u1E9F", "\u1EA1", "\u1EA3", "\u1EA5", "\u1EA7", "\u1EA9", "\u1EAB", "\u1EAD", "\u1EAF", "\u1EB1", "\u1EB3", "\u1EB5", "\u1EB7", "\u1EB9", "\u1EBB", "\u1EBD", "\u1EBF", "\u1EC1", "\u1EC3", "\u1EC5", "\u1EC7", "\u1EC9", "\u1ECB", "\u1ECD", "\u1ECF", "\u1ED1", "\u1ED3", "\u1ED5", "\u1ED7", "\u1ED9", "\u1EDB", "\u1EDD", "\u1EDF", "\u1EE1", "\u1EE3", "\u1EE5", "\u1EE7", "\u1EE9", "\u1EEB", "\u1EED", "\u1EEF", "\u1EF1", "\u1EF3", "\u1EF5", "\u1EF7", "\u1EF9", "\u1EFB", "\u1EFD", ["\u1EFF", "\u1F07"], ["\u1F10", "\u1F15"], ["\u1F20", "\u1F27"], ["\u1F30", "\u1F37"], ["\u1F40", "\u1F45"], ["\u1F50", "\u1F57"], ["\u1F60", "\u1F67"], ["\u1F70", "\u1F7D"], ["\u1F80", "\u1F87"], ["\u1F90", "\u1F97"], ["\u1FA0", "\u1FA7"], ["\u1FB0", "\u1FB4"], ["\u1FB6", "\u1FB7"], "\u1FBE", ["\u1FC2", "\u1FC4"], ["\u1FC6", "\u1FC7"], ["\u1FD0", "\u1FD3"], ["\u1FD6", "\u1FD7"], ["\u1FE0", "\u1FE7"], ["\u1FF2", "\u1FF4"], ["\u1FF6", "\u1FF7"], "\u210A", ["\u210E", "\u210F"], "\u2113", "\u212F", "\u2134", "\u2139", ["\u213C", "\u213D"], ["\u2146", "\u2149"], "\u214E", "\u2184", ["\u2C30", "\u2C5E"], "\u2C61", ["\u2C65", "\u2C66"], "\u2C68", "\u2C6A", "\u2C6C", "\u2C71", ["\u2C73", "\u2C74"], ["\u2C76", "\u2C7B"], "\u2C81", "\u2C83", "\u2C85", "\u2C87", "\u2C89", "\u2C8B", "\u2C8D", "\u2C8F", "\u2C91", "\u2C93", "\u2C95", "\u2C97", "\u2C99", "\u2C9B", "\u2C9D", "\u2C9F", "\u2CA1", "\u2CA3", "\u2CA5", "\u2CA7", "\u2CA9", "\u2CAB", "\u2CAD", "\u2CAF", "\u2CB1", "\u2CB3", "\u2CB5", "\u2CB7", "\u2CB9", "\u2CBB", "\u2CBD", "\u2CBF", "\u2CC1", "\u2CC3", "\u2CC5", "\u2CC7", "\u2CC9", "\u2CCB", "\u2CCD", "\u2CCF", "\u2CD1", "\u2CD3", "\u2CD5", "\u2CD7", "\u2CD9", "\u2CDB", "\u2CDD", "\u2CDF", "\u2CE1", ["\u2CE3", "\u2CE4"], "\u2CEC", "\u2CEE", "\u2CF3", ["\u2D00", "\u2D25"], "\u2D27", "\u2D2D", "\uA641", "\uA643", "\uA645", "\uA647", "\uA649", "\uA64B", "\uA64D", "\uA64F", "\uA651", "\uA653", "\uA655", "\uA657", "\uA659", "\uA65B", "\uA65D", "\uA65F", "\uA661", "\uA663", "\uA665", "\uA667", "\uA669", "\uA66B", "\uA66D", "\uA681", "\uA683", "\uA685", "\uA687", "\uA689", "\uA68B", "\uA68D", "\uA68F", "\uA691", "\uA693", "\uA695", "\uA697", "\uA699", "\uA69B", "\uA723", "\uA725", "\uA727", "\uA729", "\uA72B", "\uA72D", ["\uA72F", "\uA731"], "\uA733", "\uA735", "\uA737", "\uA739", "\uA73B", "\uA73D", "\uA73F", "\uA741", "\uA743", "\uA745", "\uA747", "\uA749", "\uA74B", "\uA74D", "\uA74F", "\uA751", "\uA753", "\uA755", "\uA757", "\uA759", "\uA75B", "\uA75D", "\uA75F", "\uA761", "\uA763", "\uA765", "\uA767", "\uA769", "\uA76B", "\uA76D", "\uA76F", ["\uA771", "\uA778"], "\uA77A", "\uA77C", "\uA77F", "\uA781", "\uA783", "\uA785", "\uA787", "\uA78C", "\uA78E", "\uA791", ["\uA793", "\uA795"], "\uA797", "\uA799", "\uA79B", "\uA79D", "\uA79F", "\uA7A1", "\uA7A3", "\uA7A5", "\uA7A7", "\uA7A9", "\uA7AF", "\uA7B5", "\uA7B7", "\uA7B9", "\uA7FA", ["\uAB30", "\uAB5A"], ["\uAB60", "\uAB65"], ["\uAB70", "\uABBF"], ["\uFB00", "\uFB06"], ["\uFB13", "\uFB17"], ["\uFF41", "\uFF5A"]], false, false),
				/^[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5-\u06E6\u07F4-\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C-\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D-\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C-\uA69D\uA717-\uA71F\uA770\uA788\uA7F8-\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3-\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E-\uFF9F]/,
				peg$classExpectation([["\u02B0", "\u02C1"], ["\u02C6", "\u02D1"], ["\u02E0", "\u02E4"], "\u02EC", "\u02EE", "\u0374", "\u037A", "\u0559", "\u0640", ["\u06E5", "\u06E6"], ["\u07F4", "\u07F5"], "\u07FA", "\u081A", "\u0824", "\u0828", "\u0971", "\u0E46", "\u0EC6", "\u10FC", "\u17D7", "\u1843", "\u1AA7", ["\u1C78", "\u1C7D"], ["\u1D2C", "\u1D6A"], "\u1D78", ["\u1D9B", "\u1DBF"], "\u2071", "\u207F", ["\u2090", "\u209C"], ["\u2C7C", "\u2C7D"], "\u2D6F", "\u2E2F", "\u3005", ["\u3031", "\u3035"], "\u303B", ["\u309D", "\u309E"], ["\u30FC", "\u30FE"], "\uA015", ["\uA4F8", "\uA4FD"], "\uA60C", "\uA67F", ["\uA69C", "\uA69D"], ["\uA717", "\uA71F"], "\uA770", "\uA788", ["\uA7F8", "\uA7F9"], "\uA9CF", "\uA9E6", "\uAA70", "\uAADD", ["\uAAF3", "\uAAF4"], ["\uAB5C", "\uAB5F"], "\uFF70", ["\uFF9E", "\uFF9F"]], false, false),
				/^[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05EF-\u05F2\u0620-\u063F\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u09FC\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A-\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD-\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
				peg$classExpectation(["\xAA", "\xBA", "\u01BB", ["\u01C0", "\u01C3"], "\u0294", ["\u05D0", "\u05EA"], ["\u05EF", "\u05F2"], ["\u0620", "\u063F"], ["\u0641", "\u064A"], ["\u066E", "\u066F"], ["\u0671", "\u06D3"], "\u06D5", ["\u06EE", "\u06EF"], ["\u06FA", "\u06FC"], "\u06FF", "\u0710", ["\u0712", "\u072F"], ["\u074D", "\u07A5"], "\u07B1", ["\u07CA", "\u07EA"], ["\u0800", "\u0815"], ["\u0840", "\u0858"], ["\u0860", "\u086A"], ["\u08A0", "\u08B4"], ["\u08B6", "\u08BD"], ["\u0904", "\u0939"], "\u093D", "\u0950", ["\u0958", "\u0961"], ["\u0972", "\u0980"], ["\u0985", "\u098C"], ["\u098F", "\u0990"], ["\u0993", "\u09A8"], ["\u09AA", "\u09B0"], "\u09B2", ["\u09B6", "\u09B9"], "\u09BD", "\u09CE", ["\u09DC", "\u09DD"], ["\u09DF", "\u09E1"], ["\u09F0", "\u09F1"], "\u09FC", ["\u0A05", "\u0A0A"], ["\u0A0F", "\u0A10"], ["\u0A13", "\u0A28"], ["\u0A2A", "\u0A30"], ["\u0A32", "\u0A33"], ["\u0A35", "\u0A36"], ["\u0A38", "\u0A39"], ["\u0A59", "\u0A5C"], "\u0A5E", ["\u0A72", "\u0A74"], ["\u0A85", "\u0A8D"], ["\u0A8F", "\u0A91"], ["\u0A93", "\u0AA8"], ["\u0AAA", "\u0AB0"], ["\u0AB2", "\u0AB3"], ["\u0AB5", "\u0AB9"], "\u0ABD", "\u0AD0", ["\u0AE0", "\u0AE1"], "\u0AF9", ["\u0B05", "\u0B0C"], ["\u0B0F", "\u0B10"], ["\u0B13", "\u0B28"], ["\u0B2A", "\u0B30"], ["\u0B32", "\u0B33"], ["\u0B35", "\u0B39"], "\u0B3D", ["\u0B5C", "\u0B5D"], ["\u0B5F", "\u0B61"], "\u0B71", "\u0B83", ["\u0B85", "\u0B8A"], ["\u0B8E", "\u0B90"], ["\u0B92", "\u0B95"], ["\u0B99", "\u0B9A"], "\u0B9C", ["\u0B9E", "\u0B9F"], ["\u0BA3", "\u0BA4"], ["\u0BA8", "\u0BAA"], ["\u0BAE", "\u0BB9"], "\u0BD0", ["\u0C05", "\u0C0C"], ["\u0C0E", "\u0C10"], ["\u0C12", "\u0C28"], ["\u0C2A", "\u0C39"], "\u0C3D", ["\u0C58", "\u0C5A"], ["\u0C60", "\u0C61"], "\u0C80", ["\u0C85", "\u0C8C"], ["\u0C8E", "\u0C90"], ["\u0C92", "\u0CA8"], ["\u0CAA", "\u0CB3"], ["\u0CB5", "\u0CB9"], "\u0CBD", "\u0CDE", ["\u0CE0", "\u0CE1"], ["\u0CF1", "\u0CF2"], ["\u0D05", "\u0D0C"], ["\u0D0E", "\u0D10"], ["\u0D12", "\u0D3A"], "\u0D3D", "\u0D4E", ["\u0D54", "\u0D56"], ["\u0D5F", "\u0D61"], ["\u0D7A", "\u0D7F"], ["\u0D85", "\u0D96"], ["\u0D9A", "\u0DB1"], ["\u0DB3", "\u0DBB"], "\u0DBD", ["\u0DC0", "\u0DC6"], ["\u0E01", "\u0E30"], ["\u0E32", "\u0E33"], ["\u0E40", "\u0E45"], ["\u0E81", "\u0E82"], "\u0E84", ["\u0E87", "\u0E88"], "\u0E8A", "\u0E8D", ["\u0E94", "\u0E97"], ["\u0E99", "\u0E9F"], ["\u0EA1", "\u0EA3"], "\u0EA5", "\u0EA7", ["\u0EAA", "\u0EAB"], ["\u0EAD", "\u0EB0"], ["\u0EB2", "\u0EB3"], "\u0EBD", ["\u0EC0", "\u0EC4"], ["\u0EDC", "\u0EDF"], "\u0F00", ["\u0F40", "\u0F47"], ["\u0F49", "\u0F6C"], ["\u0F88", "\u0F8C"], ["\u1000", "\u102A"], "\u103F", ["\u1050", "\u1055"], ["\u105A", "\u105D"], "\u1061", ["\u1065", "\u1066"], ["\u106E", "\u1070"], ["\u1075", "\u1081"], "\u108E", ["\u1100", "\u1248"], ["\u124A", "\u124D"], ["\u1250", "\u1256"], "\u1258", ["\u125A", "\u125D"], ["\u1260", "\u1288"], ["\u128A", "\u128D"], ["\u1290", "\u12B0"], ["\u12B2", "\u12B5"], ["\u12B8", "\u12BE"], "\u12C0", ["\u12C2", "\u12C5"], ["\u12C8", "\u12D6"], ["\u12D8", "\u1310"], ["\u1312", "\u1315"], ["\u1318", "\u135A"], ["\u1380", "\u138F"], ["\u1401", "\u166C"], ["\u166F", "\u167F"], ["\u1681", "\u169A"], ["\u16A0", "\u16EA"], ["\u16F1", "\u16F8"], ["\u1700", "\u170C"], ["\u170E", "\u1711"], ["\u1720", "\u1731"], ["\u1740", "\u1751"], ["\u1760", "\u176C"], ["\u176E", "\u1770"], ["\u1780", "\u17B3"], "\u17DC", ["\u1820", "\u1842"], ["\u1844", "\u1878"], ["\u1880", "\u1884"], ["\u1887", "\u18A8"], "\u18AA", ["\u18B0", "\u18F5"], ["\u1900", "\u191E"], ["\u1950", "\u196D"], ["\u1970", "\u1974"], ["\u1980", "\u19AB"], ["\u19B0", "\u19C9"], ["\u1A00", "\u1A16"], ["\u1A20", "\u1A54"], ["\u1B05", "\u1B33"], ["\u1B45", "\u1B4B"], ["\u1B83", "\u1BA0"], ["\u1BAE", "\u1BAF"], ["\u1BBA", "\u1BE5"], ["\u1C00", "\u1C23"], ["\u1C4D", "\u1C4F"], ["\u1C5A", "\u1C77"], ["\u1CE9", "\u1CEC"], ["\u1CEE", "\u1CF1"], ["\u1CF5", "\u1CF6"], ["\u2135", "\u2138"], ["\u2D30", "\u2D67"], ["\u2D80", "\u2D96"], ["\u2DA0", "\u2DA6"], ["\u2DA8", "\u2DAE"], ["\u2DB0", "\u2DB6"], ["\u2DB8", "\u2DBE"], ["\u2DC0", "\u2DC6"], ["\u2DC8", "\u2DCE"], ["\u2DD0", "\u2DD6"], ["\u2DD8", "\u2DDE"], "\u3006", "\u303C", ["\u3041", "\u3096"], "\u309F", ["\u30A1", "\u30FA"], "\u30FF", ["\u3105", "\u312F"], ["\u3131", "\u318E"], ["\u31A0", "\u31BA"], ["\u31F0", "\u31FF"], ["\u3400", "\u4DB5"], ["\u4E00", "\u9FEF"], ["\uA000", "\uA014"], ["\uA016", "\uA48C"], ["\uA4D0", "\uA4F7"], ["\uA500", "\uA60B"], ["\uA610", "\uA61F"], ["\uA62A", "\uA62B"], "\uA66E", ["\uA6A0", "\uA6E5"], "\uA78F", "\uA7F7", ["\uA7FB", "\uA801"], ["\uA803", "\uA805"], ["\uA807", "\uA80A"], ["\uA80C", "\uA822"], ["\uA840", "\uA873"], ["\uA882", "\uA8B3"], ["\uA8F2", "\uA8F7"], "\uA8FB", ["\uA8FD", "\uA8FE"], ["\uA90A", "\uA925"], ["\uA930", "\uA946"], ["\uA960", "\uA97C"], ["\uA984", "\uA9B2"], ["\uA9E0", "\uA9E4"], ["\uA9E7", "\uA9EF"], ["\uA9FA", "\uA9FE"], ["\uAA00", "\uAA28"], ["\uAA40", "\uAA42"], ["\uAA44", "\uAA4B"], ["\uAA60", "\uAA6F"], ["\uAA71", "\uAA76"], "\uAA7A", ["\uAA7E", "\uAAAF"], "\uAAB1", ["\uAAB5", "\uAAB6"], ["\uAAB9", "\uAABD"], "\uAAC0", "\uAAC2", ["\uAADB", "\uAADC"], ["\uAAE0", "\uAAEA"], "\uAAF2", ["\uAB01", "\uAB06"], ["\uAB09", "\uAB0E"], ["\uAB11", "\uAB16"], ["\uAB20", "\uAB26"], ["\uAB28", "\uAB2E"], ["\uABC0", "\uABE2"], ["\uAC00", "\uD7A3"], ["\uD7B0", "\uD7C6"], ["\uD7CB", "\uD7FB"], ["\uF900", "\uFA6D"], ["\uFA70", "\uFAD9"], "\uFB1D", ["\uFB1F", "\uFB28"], ["\uFB2A", "\uFB36"], ["\uFB38", "\uFB3C"], "\uFB3E", ["\uFB40", "\uFB41"], ["\uFB43", "\uFB44"], ["\uFB46", "\uFBB1"], ["\uFBD3", "\uFD3D"], ["\uFD50", "\uFD8F"], ["\uFD92", "\uFDC7"], ["\uFDF0", "\uFDFB"], ["\uFE70", "\uFE74"], ["\uFE76", "\uFEFC"], ["\uFF66", "\uFF6F"], ["\uFF71", "\uFF9D"], ["\uFFA0", "\uFFBE"], ["\uFFC2", "\uFFC7"], ["\uFFCA", "\uFFCF"], ["\uFFD2", "\uFFD7"], ["\uFFDA", "\uFFDC"]], false, false),
				/^[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,
				peg$classExpectation(["\u01C5", "\u01C8", "\u01CB", "\u01F2", ["\u1F88", "\u1F8F"], ["\u1F98", "\u1F9F"], ["\u1FA8", "\u1FAF"], "\u1FBC", "\u1FCC", "\u1FFC"], false, false),
				/^[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178-\u0179\u017B\u017D\u0181-\u0182\u0184\u0186-\u0187\u0189-\u018B\u018E-\u0191\u0193-\u0194\u0196-\u0198\u019C-\u019D\u019F-\u01A0\u01A2\u01A4\u01A6-\u01A7\u01A9\u01AC\u01AE-\u01AF\u01B1-\u01B3\u01B5\u01B7-\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A-\u023B\u023D-\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E-\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9-\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0-\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E-\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D-\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uFF21-\uFF3A]/,
				peg$classExpectation([["A", "Z"], ["\xC0", "\xD6"], ["\xD8", "\xDE"], "\u0100", "\u0102", "\u0104", "\u0106", "\u0108", "\u010A", "\u010C", "\u010E", "\u0110", "\u0112", "\u0114", "\u0116", "\u0118", "\u011A", "\u011C", "\u011E", "\u0120", "\u0122", "\u0124", "\u0126", "\u0128", "\u012A", "\u012C", "\u012E", "\u0130", "\u0132", "\u0134", "\u0136", "\u0139", "\u013B", "\u013D", "\u013F", "\u0141", "\u0143", "\u0145", "\u0147", "\u014A", "\u014C", "\u014E", "\u0150", "\u0152", "\u0154", "\u0156", "\u0158", "\u015A", "\u015C", "\u015E", "\u0160", "\u0162", "\u0164", "\u0166", "\u0168", "\u016A", "\u016C", "\u016E", "\u0170", "\u0172", "\u0174", "\u0176", ["\u0178", "\u0179"], "\u017B", "\u017D", ["\u0181", "\u0182"], "\u0184", ["\u0186", "\u0187"], ["\u0189", "\u018B"], ["\u018E", "\u0191"], ["\u0193", "\u0194"], ["\u0196", "\u0198"], ["\u019C", "\u019D"], ["\u019F", "\u01A0"], "\u01A2", "\u01A4", ["\u01A6", "\u01A7"], "\u01A9", "\u01AC", ["\u01AE", "\u01AF"], ["\u01B1", "\u01B3"], "\u01B5", ["\u01B7", "\u01B8"], "\u01BC", "\u01C4", "\u01C7", "\u01CA", "\u01CD", "\u01CF", "\u01D1", "\u01D3", "\u01D5", "\u01D7", "\u01D9", "\u01DB", "\u01DE", "\u01E0", "\u01E2", "\u01E4", "\u01E6", "\u01E8", "\u01EA", "\u01EC", "\u01EE", "\u01F1", "\u01F4", ["\u01F6", "\u01F8"], "\u01FA", "\u01FC", "\u01FE", "\u0200", "\u0202", "\u0204", "\u0206", "\u0208", "\u020A", "\u020C", "\u020E", "\u0210", "\u0212", "\u0214", "\u0216", "\u0218", "\u021A", "\u021C", "\u021E", "\u0220", "\u0222", "\u0224", "\u0226", "\u0228", "\u022A", "\u022C", "\u022E", "\u0230", "\u0232", ["\u023A", "\u023B"], ["\u023D", "\u023E"], "\u0241", ["\u0243", "\u0246"], "\u0248", "\u024A", "\u024C", "\u024E", "\u0370", "\u0372", "\u0376", "\u037F", "\u0386", ["\u0388", "\u038A"], "\u038C", ["\u038E", "\u038F"], ["\u0391", "\u03A1"], ["\u03A3", "\u03AB"], "\u03CF", ["\u03D2", "\u03D4"], "\u03D8", "\u03DA", "\u03DC", "\u03DE", "\u03E0", "\u03E2", "\u03E4", "\u03E6", "\u03E8", "\u03EA", "\u03EC", "\u03EE", "\u03F4", "\u03F7", ["\u03F9", "\u03FA"], ["\u03FD", "\u042F"], "\u0460", "\u0462", "\u0464", "\u0466", "\u0468", "\u046A", "\u046C", "\u046E", "\u0470", "\u0472", "\u0474", "\u0476", "\u0478", "\u047A", "\u047C", "\u047E", "\u0480", "\u048A", "\u048C", "\u048E", "\u0490", "\u0492", "\u0494", "\u0496", "\u0498", "\u049A", "\u049C", "\u049E", "\u04A0", "\u04A2", "\u04A4", "\u04A6", "\u04A8", "\u04AA", "\u04AC", "\u04AE", "\u04B0", "\u04B2", "\u04B4", "\u04B6", "\u04B8", "\u04BA", "\u04BC", "\u04BE", ["\u04C0", "\u04C1"], "\u04C3", "\u04C5", "\u04C7", "\u04C9", "\u04CB", "\u04CD", "\u04D0", "\u04D2", "\u04D4", "\u04D6", "\u04D8", "\u04DA", "\u04DC", "\u04DE", "\u04E0", "\u04E2", "\u04E4", "\u04E6", "\u04E8", "\u04EA", "\u04EC", "\u04EE", "\u04F0", "\u04F2", "\u04F4", "\u04F6", "\u04F8", "\u04FA", "\u04FC", "\u04FE", "\u0500", "\u0502", "\u0504", "\u0506", "\u0508", "\u050A", "\u050C", "\u050E", "\u0510", "\u0512", "\u0514", "\u0516", "\u0518", "\u051A", "\u051C", "\u051E", "\u0520", "\u0522", "\u0524", "\u0526", "\u0528", "\u052A", "\u052C", "\u052E", ["\u0531", "\u0556"], ["\u10A0", "\u10C5"], "\u10C7", "\u10CD", ["\u13A0", "\u13F5"], ["\u1C90", "\u1CBA"], ["\u1CBD", "\u1CBF"], "\u1E00", "\u1E02", "\u1E04", "\u1E06", "\u1E08", "\u1E0A", "\u1E0C", "\u1E0E", "\u1E10", "\u1E12", "\u1E14", "\u1E16", "\u1E18", "\u1E1A", "\u1E1C", "\u1E1E", "\u1E20", "\u1E22", "\u1E24", "\u1E26", "\u1E28", "\u1E2A", "\u1E2C", "\u1E2E", "\u1E30", "\u1E32", "\u1E34", "\u1E36", "\u1E38", "\u1E3A", "\u1E3C", "\u1E3E", "\u1E40", "\u1E42", "\u1E44", "\u1E46", "\u1E48", "\u1E4A", "\u1E4C", "\u1E4E", "\u1E50", "\u1E52", "\u1E54", "\u1E56", "\u1E58", "\u1E5A", "\u1E5C", "\u1E5E", "\u1E60", "\u1E62", "\u1E64", "\u1E66", "\u1E68", "\u1E6A", "\u1E6C", "\u1E6E", "\u1E70", "\u1E72", "\u1E74", "\u1E76", "\u1E78", "\u1E7A", "\u1E7C", "\u1E7E", "\u1E80", "\u1E82", "\u1E84", "\u1E86", "\u1E88", "\u1E8A", "\u1E8C", "\u1E8E", "\u1E90", "\u1E92", "\u1E94", "\u1E9E", "\u1EA0", "\u1EA2", "\u1EA4", "\u1EA6", "\u1EA8", "\u1EAA", "\u1EAC", "\u1EAE", "\u1EB0", "\u1EB2", "\u1EB4", "\u1EB6", "\u1EB8", "\u1EBA", "\u1EBC", "\u1EBE", "\u1EC0", "\u1EC2", "\u1EC4", "\u1EC6", "\u1EC8", "\u1ECA", "\u1ECC", "\u1ECE", "\u1ED0", "\u1ED2", "\u1ED4", "\u1ED6", "\u1ED8", "\u1EDA", "\u1EDC", "\u1EDE", "\u1EE0", "\u1EE2", "\u1EE4", "\u1EE6", "\u1EE8", "\u1EEA", "\u1EEC", "\u1EEE", "\u1EF0", "\u1EF2", "\u1EF4", "\u1EF6", "\u1EF8", "\u1EFA", "\u1EFC", "\u1EFE", ["\u1F08", "\u1F0F"], ["\u1F18", "\u1F1D"], ["\u1F28", "\u1F2F"], ["\u1F38", "\u1F3F"], ["\u1F48", "\u1F4D"], "\u1F59", "\u1F5B", "\u1F5D", "\u1F5F", ["\u1F68", "\u1F6F"], ["\u1FB8", "\u1FBB"], ["\u1FC8", "\u1FCB"], ["\u1FD8", "\u1FDB"], ["\u1FE8", "\u1FEC"], ["\u1FF8", "\u1FFB"], "\u2102", "\u2107", ["\u210B", "\u210D"], ["\u2110", "\u2112"], "\u2115", ["\u2119", "\u211D"], "\u2124", "\u2126", "\u2128", ["\u212A", "\u212D"], ["\u2130", "\u2133"], ["\u213E", "\u213F"], "\u2145", "\u2183", ["\u2C00", "\u2C2E"], "\u2C60", ["\u2C62", "\u2C64"], "\u2C67", "\u2C69", "\u2C6B", ["\u2C6D", "\u2C70"], "\u2C72", "\u2C75", ["\u2C7E", "\u2C80"], "\u2C82", "\u2C84", "\u2C86", "\u2C88", "\u2C8A", "\u2C8C", "\u2C8E", "\u2C90", "\u2C92", "\u2C94", "\u2C96", "\u2C98", "\u2C9A", "\u2C9C", "\u2C9E", "\u2CA0", "\u2CA2", "\u2CA4", "\u2CA6", "\u2CA8", "\u2CAA", "\u2CAC", "\u2CAE", "\u2CB0", "\u2CB2", "\u2CB4", "\u2CB6", "\u2CB8", "\u2CBA", "\u2CBC", "\u2CBE", "\u2CC0", "\u2CC2", "\u2CC4", "\u2CC6", "\u2CC8", "\u2CCA", "\u2CCC", "\u2CCE", "\u2CD0", "\u2CD2", "\u2CD4", "\u2CD6", "\u2CD8", "\u2CDA", "\u2CDC", "\u2CDE", "\u2CE0", "\u2CE2", "\u2CEB", "\u2CED", "\u2CF2", "\uA640", "\uA642", "\uA644", "\uA646", "\uA648", "\uA64A", "\uA64C", "\uA64E", "\uA650", "\uA652", "\uA654", "\uA656", "\uA658", "\uA65A", "\uA65C", "\uA65E", "\uA660", "\uA662", "\uA664", "\uA666", "\uA668", "\uA66A", "\uA66C", "\uA680", "\uA682", "\uA684", "\uA686", "\uA688", "\uA68A", "\uA68C", "\uA68E", "\uA690", "\uA692", "\uA694", "\uA696", "\uA698", "\uA69A", "\uA722", "\uA724", "\uA726", "\uA728", "\uA72A", "\uA72C", "\uA72E", "\uA732", "\uA734", "\uA736", "\uA738", "\uA73A", "\uA73C", "\uA73E", "\uA740", "\uA742", "\uA744", "\uA746", "\uA748", "\uA74A", "\uA74C", "\uA74E", "\uA750", "\uA752", "\uA754", "\uA756", "\uA758", "\uA75A", "\uA75C", "\uA75E", "\uA760", "\uA762", "\uA764", "\uA766", "\uA768", "\uA76A", "\uA76C", "\uA76E", "\uA779", "\uA77B", ["\uA77D", "\uA77E"], "\uA780", "\uA782", "\uA784", "\uA786", "\uA78B", "\uA78D", "\uA790", "\uA792", "\uA796", "\uA798", "\uA79A", "\uA79C", "\uA79E", "\uA7A0", "\uA7A2", "\uA7A4", "\uA7A6", "\uA7A8", ["\uA7AA", "\uA7AE"], ["\uA7B0", "\uA7B4"], "\uA7B6", "\uA7B8", ["\uFF21", "\uFF3A"]], false, false),
				/^[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0982-\u0983\u09BE-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0B02-\u0B03\u0B3E\u0B40\u0B47-\u0B48\u0B4B-\u0B4C\u0B57\u0BBE-\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82-\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7-\u0CC8\u0CCA-\u0CCB\u0CD5-\u0CD6\u0D02-\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82-\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2-\u0DF3\u0F3E-\u0F3F\u0F7F\u102B-\u102C\u1031\u1038\u103B-\u103C\u1056-\u1057\u1062-\u1064\u1067-\u106D\u1083-\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7-\u17C8\u1923-\u1926\u1929-\u192B\u1930-\u1931\u1933-\u1938\u1A19-\u1A1A\u1A55\u1A57\u1A61\u1A63-\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B82\u1BA1\u1BA6-\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1C24-\u1C2B\u1C34-\u1C35\u1CE1\u1CF2-\u1CF3\u1CF7\u302E-\u302F\uA823-\uA824\uA827\uA880-\uA881\uA8B4-\uA8C3\uA952-\uA953\uA983\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uAA2F-\uAA30\uAA33-\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE-\uAAEF\uAAF5\uABE3-\uABE4\uABE6-\uABE7\uABE9-\uABEA\uABEC]/,
				peg$classExpectation(["\u0903", "\u093B", ["\u093E", "\u0940"], ["\u0949", "\u094C"], ["\u094E", "\u094F"], ["\u0982", "\u0983"], ["\u09BE", "\u09C0"], ["\u09C7", "\u09C8"], ["\u09CB", "\u09CC"], "\u09D7", "\u0A03", ["\u0A3E", "\u0A40"], "\u0A83", ["\u0ABE", "\u0AC0"], "\u0AC9", ["\u0ACB", "\u0ACC"], ["\u0B02", "\u0B03"], "\u0B3E", "\u0B40", ["\u0B47", "\u0B48"], ["\u0B4B", "\u0B4C"], "\u0B57", ["\u0BBE", "\u0BBF"], ["\u0BC1", "\u0BC2"], ["\u0BC6", "\u0BC8"], ["\u0BCA", "\u0BCC"], "\u0BD7", ["\u0C01", "\u0C03"], ["\u0C41", "\u0C44"], ["\u0C82", "\u0C83"], "\u0CBE", ["\u0CC0", "\u0CC4"], ["\u0CC7", "\u0CC8"], ["\u0CCA", "\u0CCB"], ["\u0CD5", "\u0CD6"], ["\u0D02", "\u0D03"], ["\u0D3E", "\u0D40"], ["\u0D46", "\u0D48"], ["\u0D4A", "\u0D4C"], "\u0D57", ["\u0D82", "\u0D83"], ["\u0DCF", "\u0DD1"], ["\u0DD8", "\u0DDF"], ["\u0DF2", "\u0DF3"], ["\u0F3E", "\u0F3F"], "\u0F7F", ["\u102B", "\u102C"], "\u1031", "\u1038", ["\u103B", "\u103C"], ["\u1056", "\u1057"], ["\u1062", "\u1064"], ["\u1067", "\u106D"], ["\u1083", "\u1084"], ["\u1087", "\u108C"], "\u108F", ["\u109A", "\u109C"], "\u17B6", ["\u17BE", "\u17C5"], ["\u17C7", "\u17C8"], ["\u1923", "\u1926"], ["\u1929", "\u192B"], ["\u1930", "\u1931"], ["\u1933", "\u1938"], ["\u1A19", "\u1A1A"], "\u1A55", "\u1A57", "\u1A61", ["\u1A63", "\u1A64"], ["\u1A6D", "\u1A72"], "\u1B04", "\u1B35", "\u1B3B", ["\u1B3D", "\u1B41"], ["\u1B43", "\u1B44"], "\u1B82", "\u1BA1", ["\u1BA6", "\u1BA7"], "\u1BAA", "\u1BE7", ["\u1BEA", "\u1BEC"], "\u1BEE", ["\u1BF2", "\u1BF3"], ["\u1C24", "\u1C2B"], ["\u1C34", "\u1C35"], "\u1CE1", ["\u1CF2", "\u1CF3"], "\u1CF7", ["\u302E", "\u302F"], ["\uA823", "\uA824"], "\uA827", ["\uA880", "\uA881"], ["\uA8B4", "\uA8C3"], ["\uA952", "\uA953"], "\uA983", ["\uA9B4", "\uA9B5"], ["\uA9BA", "\uA9BB"], ["\uA9BD", "\uA9C0"], ["\uAA2F", "\uAA30"], ["\uAA33", "\uAA34"], "\uAA4D", "\uAA7B", "\uAA7D", "\uAAEB", ["\uAAEE", "\uAAEF"], "\uAAF5", ["\uABE3", "\uABE4"], ["\uABE6", "\uABE7"], ["\uABE9", "\uABEA"], "\uABEC"], false, false),
				/^[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2-\u09E3\u09FE\u0A01-\u0A02\u0A3C\u0A41-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7-\u0AC8\u0ACD\u0AE2-\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62-\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C62-\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC-\u0CCD\u0CE2-\u0CE3\u0D00-\u0D01\u0D3B-\u0D3C\u0D41-\u0D44\u0D4D\u0D62-\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039-\u103A\u103D-\u103E\u1058-\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885-\u1886\u18A9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193B\u1A17-\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80-\u1B81\u1BA2-\u1BA5\u1BA8-\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8-\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099-\u309A\uA66F\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1\uA802\uA806\uA80B\uA825-\uA826\uA8C4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31-\uAA32\uAA35-\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1\uAAEC-\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/,
				peg$classExpectation([["\u0300", "\u036F"], ["\u0483", "\u0487"], ["\u0591", "\u05BD"], "\u05BF", ["\u05C1", "\u05C2"], ["\u05C4", "\u05C5"], "\u05C7", ["\u0610", "\u061A"], ["\u064B", "\u065F"], "\u0670", ["\u06D6", "\u06DC"], ["\u06DF", "\u06E4"], ["\u06E7", "\u06E8"], ["\u06EA", "\u06ED"], "\u0711", ["\u0730", "\u074A"], ["\u07A6", "\u07B0"], ["\u07EB", "\u07F3"], "\u07FD", ["\u0816", "\u0819"], ["\u081B", "\u0823"], ["\u0825", "\u0827"], ["\u0829", "\u082D"], ["\u0859", "\u085B"], ["\u08D3", "\u08E1"], ["\u08E3", "\u0902"], "\u093A", "\u093C", ["\u0941", "\u0948"], "\u094D", ["\u0951", "\u0957"], ["\u0962", "\u0963"], "\u0981", "\u09BC", ["\u09C1", "\u09C4"], "\u09CD", ["\u09E2", "\u09E3"], "\u09FE", ["\u0A01", "\u0A02"], "\u0A3C", ["\u0A41", "\u0A42"], ["\u0A47", "\u0A48"], ["\u0A4B", "\u0A4D"], "\u0A51", ["\u0A70", "\u0A71"], "\u0A75", ["\u0A81", "\u0A82"], "\u0ABC", ["\u0AC1", "\u0AC5"], ["\u0AC7", "\u0AC8"], "\u0ACD", ["\u0AE2", "\u0AE3"], ["\u0AFA", "\u0AFF"], "\u0B01", "\u0B3C", "\u0B3F", ["\u0B41", "\u0B44"], "\u0B4D", "\u0B56", ["\u0B62", "\u0B63"], "\u0B82", "\u0BC0", "\u0BCD", "\u0C00", "\u0C04", ["\u0C3E", "\u0C40"], ["\u0C46", "\u0C48"], ["\u0C4A", "\u0C4D"], ["\u0C55", "\u0C56"], ["\u0C62", "\u0C63"], "\u0C81", "\u0CBC", "\u0CBF", "\u0CC6", ["\u0CCC", "\u0CCD"], ["\u0CE2", "\u0CE3"], ["\u0D00", "\u0D01"], ["\u0D3B", "\u0D3C"], ["\u0D41", "\u0D44"], "\u0D4D", ["\u0D62", "\u0D63"], "\u0DCA", ["\u0DD2", "\u0DD4"], "\u0DD6", "\u0E31", ["\u0E34", "\u0E3A"], ["\u0E47", "\u0E4E"], "\u0EB1", ["\u0EB4", "\u0EB9"], ["\u0EBB", "\u0EBC"], ["\u0EC8", "\u0ECD"], ["\u0F18", "\u0F19"], "\u0F35", "\u0F37", "\u0F39", ["\u0F71", "\u0F7E"], ["\u0F80", "\u0F84"], ["\u0F86", "\u0F87"], ["\u0F8D", "\u0F97"], ["\u0F99", "\u0FBC"], "\u0FC6", ["\u102D", "\u1030"], ["\u1032", "\u1037"], ["\u1039", "\u103A"], ["\u103D", "\u103E"], ["\u1058", "\u1059"], ["\u105E", "\u1060"], ["\u1071", "\u1074"], "\u1082", ["\u1085", "\u1086"], "\u108D", "\u109D", ["\u135D", "\u135F"], ["\u1712", "\u1714"], ["\u1732", "\u1734"], ["\u1752", "\u1753"], ["\u1772", "\u1773"], ["\u17B4", "\u17B5"], ["\u17B7", "\u17BD"], "\u17C6", ["\u17C9", "\u17D3"], "\u17DD", ["\u180B", "\u180D"], ["\u1885", "\u1886"], "\u18A9", ["\u1920", "\u1922"], ["\u1927", "\u1928"], "\u1932", ["\u1939", "\u193B"], ["\u1A17", "\u1A18"], "\u1A1B", "\u1A56", ["\u1A58", "\u1A5E"], "\u1A60", "\u1A62", ["\u1A65", "\u1A6C"], ["\u1A73", "\u1A7C"], "\u1A7F", ["\u1AB0", "\u1ABD"], ["\u1B00", "\u1B03"], "\u1B34", ["\u1B36", "\u1B3A"], "\u1B3C", "\u1B42", ["\u1B6B", "\u1B73"], ["\u1B80", "\u1B81"], ["\u1BA2", "\u1BA5"], ["\u1BA8", "\u1BA9"], ["\u1BAB", "\u1BAD"], "\u1BE6", ["\u1BE8", "\u1BE9"], "\u1BED", ["\u1BEF", "\u1BF1"], ["\u1C2C", "\u1C33"], ["\u1C36", "\u1C37"], ["\u1CD0", "\u1CD2"], ["\u1CD4", "\u1CE0"], ["\u1CE2", "\u1CE8"], "\u1CED", "\u1CF4", ["\u1CF8", "\u1CF9"], ["\u1DC0", "\u1DF9"], ["\u1DFB", "\u1DFF"], ["\u20D0", "\u20DC"], "\u20E1", ["\u20E5", "\u20F0"], ["\u2CEF", "\u2CF1"], "\u2D7F", ["\u2DE0", "\u2DFF"], ["\u302A", "\u302D"], ["\u3099", "\u309A"], "\uA66F", ["\uA674", "\uA67D"], ["\uA69E", "\uA69F"], ["\uA6F0", "\uA6F1"], "\uA802", "\uA806", "\uA80B", ["\uA825", "\uA826"], ["\uA8C4", "\uA8C5"], ["\uA8E0", "\uA8F1"], "\uA8FF", ["\uA926", "\uA92D"], ["\uA947", "\uA951"], ["\uA980", "\uA982"], "\uA9B3", ["\uA9B6", "\uA9B9"], "\uA9BC", "\uA9E5", ["\uAA29", "\uAA2E"], ["\uAA31", "\uAA32"], ["\uAA35", "\uAA36"], "\uAA43", "\uAA4C", "\uAA7C", "\uAAB0", ["\uAAB2", "\uAAB4"], ["\uAAB7", "\uAAB8"], ["\uAABE", "\uAABF"], "\uAAC1", ["\uAAEC", "\uAAED"], "\uAAF6", "\uABE5", "\uABE8", "\uABED", "\uFB1E", ["\uFE00", "\uFE0F"], ["\uFE20", "\uFE2F"]], false, false),
				/^[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/,
				peg$classExpectation([["0", "9"], ["\u0660", "\u0669"], ["\u06F0", "\u06F9"], ["\u07C0", "\u07C9"], ["\u0966", "\u096F"], ["\u09E6", "\u09EF"], ["\u0A66", "\u0A6F"], ["\u0AE6", "\u0AEF"], ["\u0B66", "\u0B6F"], ["\u0BE6", "\u0BEF"], ["\u0C66", "\u0C6F"], ["\u0CE6", "\u0CEF"], ["\u0D66", "\u0D6F"], ["\u0DE6", "\u0DEF"], ["\u0E50", "\u0E59"], ["\u0ED0", "\u0ED9"], ["\u0F20", "\u0F29"], ["\u1040", "\u1049"], ["\u1090", "\u1099"], ["\u17E0", "\u17E9"], ["\u1810", "\u1819"], ["\u1946", "\u194F"], ["\u19D0", "\u19D9"], ["\u1A80", "\u1A89"], ["\u1A90", "\u1A99"], ["\u1B50", "\u1B59"], ["\u1BB0", "\u1BB9"], ["\u1C40", "\u1C49"], ["\u1C50", "\u1C59"], ["\uA620", "\uA629"], ["\uA8D0", "\uA8D9"], ["\uA900", "\uA909"], ["\uA9D0", "\uA9D9"], ["\uA9F0", "\uA9F9"], ["\uAA50", "\uAA59"], ["\uABF0", "\uABF9"], ["\uFF10", "\uFF19"]], false, false),
				/^[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]/,
				peg$classExpectation([["\u16EE", "\u16F0"], ["\u2160", "\u2182"], ["\u2185", "\u2188"], "\u3007", ["\u3021", "\u3029"], ["\u3038", "\u303A"], ["\uA6E6", "\uA6EF"]], false, false),
				/^[_\u203F-\u2040\u2054\uFE33-\uFE34\uFE4D-\uFE4F\uFF3F]/,
				peg$classExpectation(["_", ["\u203F", "\u2040"], "\u2054", ["\uFE33", "\uFE34"], ["\uFE4D", "\uFE4F"], "\uFF3F"], false, false),
				/^[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
				peg$classExpectation([" ", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u202F", "\u205F", "\u3000"], false, false),
				"break",
				peg$literalExpectation("break", false),
				"case",
				peg$literalExpectation("case", false),
				"catch",
				peg$literalExpectation("catch", false),
				"class",
				peg$literalExpectation("class", false),
				"const",
				peg$literalExpectation("const", false),
				"continue",
				peg$literalExpectation("continue", false),
				"debugger",
				peg$literalExpectation("debugger", false),
				"default",
				peg$literalExpectation("default", false),
				"delete",
				peg$literalExpectation("delete", false),
				"do",
				peg$literalExpectation("do", false),
				"else",
				peg$literalExpectation("else", false),
				"enum",
				peg$literalExpectation("enum", false),
				"export",
				peg$literalExpectation("export", false),
				"extends",
				peg$literalExpectation("extends", false),
				"false",
				peg$literalExpectation("false", false),
				"finally",
				peg$literalExpectation("finally", false),
				"for",
				peg$literalExpectation("for", false),
				"function",
				peg$literalExpectation("function", false),
				"get",
				peg$literalExpectation("get", false),
				"if",
				peg$literalExpectation("if", false),
				"import",
				peg$literalExpectation("import", false),
				"instanceof",
				peg$literalExpectation("instanceof", false),
				"in",
				peg$literalExpectation("in", false),
				"new",
				peg$literalExpectation("new", false),
				"null",
				peg$literalExpectation("null", false),
				"return",
				peg$literalExpectation("return", false),
				"set",
				peg$literalExpectation("set", false),
				"super",
				peg$literalExpectation("super", false),
				"switch",
				peg$literalExpectation("switch", false),
				"this",
				peg$literalExpectation("this", false),
				"throw",
				peg$literalExpectation("throw", false),
				"true",
				peg$literalExpectation("true", false),
				"try",
				peg$literalExpectation("try", false),
				"typeof",
				peg$literalExpectation("typeof", false),
				"var",
				peg$literalExpectation("var", false),
				"void",
				peg$literalExpectation("void", false),
				"while",
				peg$literalExpectation("while", false),
				"with",
				peg$literalExpectation("with", false),
				";",
				peg$literalExpectation(";", false),
				"}",
				peg$literalExpectation("}", false),
				function () { return { type: "ThisExpression" }; },
				"(",
				peg$literalExpectation("(", false),
				")",
				peg$literalExpectation(")", false),
				function (expression) { return expression; },
				function (elision) {
					return {
						type: "ArrayExpression",
						elements: optionalList(extractOptional(elision, 0))
					};
				},
				function (elements) {
					return {
						type: "ArrayExpression",
						elements: elements
					};
				},
				",",
				peg$literalExpectation(",", false),
				function (elements, elision) {
					return {
						type: "ArrayExpression",
						elements: elements.concat(optionalList(extractOptional(elision, 0)))
					};
				},
				function (elision, element) {
					return optionalList(extractOptional(elision, 0)).concat(element);
				},
				function (head, elision, element) {
					return optionalList(extractOptional(elision, 0)).concat(element);
				},
				function (head, tail) { return Array.prototype.concat.apply(head, tail); },
				function (commas) { return filledArray(commas.length + 1, null); },
				"{",
				peg$literalExpectation("{", false),
				function () { return { type: "ObjectExpression", properties: [] }; },
				function (properties) {
					return { type: "ObjectExpression", properties: properties };
				},
				function (head, tail) {
					return buildList(head, tail, 3);
				},
				":",
				peg$literalExpectation(":", false),
				function (key, value) {
					return { type: "Property", key: key, value: value, kind: "init" };
				},
				function (key, body) {
					return {
						type: "Property",
						key: key,
						value: {
							type: "FunctionExpression",
							id: null,
							params: [],
							body: body
						},
						kind: "get"
					};
				},
				function (key, params, body) {
					return {
						type: "Property",
						key: key,
						value: {
							type: "FunctionExpression",
							id: null,
							params: params,
							body: body
						},
						kind: "set"
					};
				},
				function (id) { return [id]; },
				function (callee, args) {
					return { type: "NewExpression", callee: callee, arguments: args };
				},
				function (head, property) {
					return { property: property, computed: true };
				},
				function (head, property) {
					return { property: property, computed: false };
				},
				function (head, tail) {
					return tail.reduce(function (result, element) {
						return {
							type: "MemberExpression",
							object: result,
							property: element.property,
							computed: element.computed
						};
					}, head);
				},
				function (callee) {
					return { type: "NewExpression", callee: callee, arguments: [] };
				},
				function (callee, args) {
					return { type: "CallExpression", callee: callee, arguments: args };
				},
				function (head, args) {
					return { type: "CallExpression", arguments: args };
				},
				function (head, property) {
					return {
						type: "MemberExpression",
						property: property,
						computed: true
					};
				},
				function (head, property) {
					return {
						type: "MemberExpression",
						property: property,
						computed: false
					};
				},
				function (head, tail) {
					return tail.reduce(function (result, element) {
						element[TYPES_TO_PROPERTY_NAMES[element.type]] = result;

						return element;
					}, head);
				},
				function (args) {
					return optionalList(extractOptional(args, 0));
				},
				function (argument, operator) {
					return {
						type: "UpdateExpression",
						operator: operator,
						argument: argument,
						prefix: false
					};
				},
				"++",
				peg$literalExpectation("++", false),
				"--",
				peg$literalExpectation("--", false),
				function (operator, argument) {
					var type = (operator === "++" || operator === "--")
						? "UpdateExpression"
						: "UnaryExpression";

					return {
						type: type,
						operator: operator,
						argument: argument,
						prefix: true
					};
				},
				"+",
				peg$literalExpectation("+", false),
				"=",
				peg$literalExpectation("=", false),
				"-",
				peg$literalExpectation("-", false),
				"~",
				peg$literalExpectation("~", false),
				"!",
				peg$literalExpectation("!", false),
				function (head, tail) { return buildBinaryExpression(head, tail); },
				"*",
				peg$literalExpectation("*", false),
				"%",
				peg$literalExpectation("%", false),
				/^[+=]/,
				peg$classExpectation(["+", "="], false, false),
				/^[\-=]/,
				peg$classExpectation(["-", "="], false, false),
				"<<",
				peg$literalExpectation("<<", false),
				">>>",
				peg$literalExpectation(">>>", false),
				">>",
				peg$literalExpectation(">>", false),
				"<=",
				peg$literalExpectation("<=", false),
				">=",
				peg$literalExpectation(">=", false),
				"<",
				peg$literalExpectation("<", false),
				">",
				peg$literalExpectation(">", false),
				"===",
				peg$literalExpectation("===", false),
				"!==",
				peg$literalExpectation("!==", false),
				"==",
				peg$literalExpectation("==", false),
				"!=",
				peg$literalExpectation("!=", false),
				"&",
				peg$literalExpectation("&", false),
				/^[&=]/,
				peg$classExpectation(["&", "="], false, false),
				"^",
				peg$literalExpectation("^", false),
				"|",
				peg$literalExpectation("|", false),
				/^[|=]/,
				peg$classExpectation(["|", "="], false, false),
				function (head, tail) { return buildLogicalExpression(head, tail); },
				"&&",
				peg$literalExpectation("&&", false),
				"||",
				peg$literalExpectation("||", false),
				"?",
				peg$literalExpectation("?", false),
				function (test, consequent, alternate) {
					return {
						type: "ConditionalExpression",
						test: test,
						consequent: consequent,
						alternate: alternate
					};
				},
				function (left, right) {
					return {
						type: "AssignmentExpression",
						operator: "=",
						left: left,
						right: right
					};
				},
				function (left, operator, right) {
					return {
						type: "AssignmentExpression",
						operator: operator,
						left: left,
						right: right
					};
				},
				"*=",
				peg$literalExpectation("*=", false),
				"/=",
				peg$literalExpectation("/=", false),
				"%=",
				peg$literalExpectation("%=", false),
				"+=",
				peg$literalExpectation("+=", false),
				"-=",
				peg$literalExpectation("-=", false),
				"<<=",
				peg$literalExpectation("<<=", false),
				">>=",
				peg$literalExpectation(">>=", false),
				">>>=",
				peg$literalExpectation(">>>=", false),
				"&=",
				peg$literalExpectation("&=", false),
				"^=",
				peg$literalExpectation("^=", false),
				"|=",
				peg$literalExpectation("|=", false),
				function (head, tail) {
					return tail.length > 0
						? { type: "SequenceExpression", expressions: buildList(head, tail, 3) }
						: head;
				},
				function (body) {
					return {
						type: "BlockStatement",
						body: optionalList(extractOptional(body, 0))
					};
				},
				function (head, tail) { return buildList(head, tail, 1); },
				function (declarations) {
					return {
						type: "VariableDeclaration",
						declarations: declarations,
						kind: "var"
					};
				},
				function (id, init) {
					return {
						type: "VariableDeclarator",
						id: id,
						init: extractOptional(init, 1)
					};
				},
				function () { return { type: "EmptyStatement" }; },
				function (expression) {
					return {
						type: "ExpressionStatement",
						expression: expression
					};
				},
				function (test, consequent, alternate) {
					return {
						type: "IfStatement",
						test: test,
						consequent: consequent,
						alternate: alternate
					};
				},
				function (test, consequent) {
					return {
						type: "IfStatement",
						test: test,
						consequent: consequent,
						alternate: null
					};
				},
				function (body, test) { return { type: "DoWhileStatement", body: body, test: test }; },
				function (test, body) { return { type: "WhileStatement", test: test, body: body }; },
				function (init, test, update, body) {
					return {
						type: "ForStatement",
						init: extractOptional(init, 0),
						test: extractOptional(test, 0),
						update: extractOptional(update, 0),
						body: body
					};
				},
				function (declarations, test, update, body) {
					return {
						type: "ForStatement",
						init: {
							type: "VariableDeclaration",
							declarations: declarations,
							kind: "var"
						},
						test: extractOptional(test, 0),
						update: extractOptional(update, 0),
						body: body
					};
				},
				function (left, right, body) {
					return {
						type: "ForInStatement",
						left: left,
						right: right,
						body: body
					};
				},
				function (declarations, right, body) {
					return {
						type: "ForInStatement",
						left: {
							type: "VariableDeclaration",
							declarations: declarations,
							kind: "var"
						},
						right: right,
						body: body
					};
				},
				function () {
					return { type: "ContinueStatement", label: null };
				},
				function (label) {
					return { type: "ContinueStatement", label: label };
				},
				function () {
					return { type: "BreakStatement", label: null };
				},
				function (label) {
					return { type: "BreakStatement", label: label };
				},
				function () {
					return { type: "ReturnStatement", argument: null };
				},
				function (argument) {
					return { type: "ReturnStatement", argument: argument };
				},
				function (object, body) { return { type: "WithStatement", object: object, body: body }; },
				function (discriminant, cases) {
					return {
						type: "SwitchStatement",
						discriminant: discriminant,
						cases: cases
					};
				},
				function (clauses) {
					return optionalList(extractOptional(clauses, 0));
				},
				function (before, default_, after) {
					return optionalList(extractOptional(before, 0))
						.concat(default_)
						.concat(optionalList(extractOptional(after, 0)));
				},
				function (test, consequent) {
					return {
						type: "SwitchCase",
						test: test,
						consequent: optionalList(extractOptional(consequent, 1))
					};
				},
				function (consequent) {
					return {
						type: "SwitchCase",
						test: null,
						consequent: optionalList(extractOptional(consequent, 1))
					};
				},
				function (label, body) {
					return { type: "LabeledStatement", label: label, body: body };
				},
				function (argument) {
					return { type: "ThrowStatement", argument: argument };
				},
				function (block, handler, finalizer) {
					return {
						type: "TryStatement",
						block: block,
						handler: handler,
						finalizer: finalizer
					};
				},
				function (block, handler) {
					return {
						type: "TryStatement",
						block: block,
						handler: handler,
						finalizer: null
					};
				},
				function (block, finalizer) {
					return {
						type: "TryStatement",
						block: block,
						handler: null,
						finalizer: finalizer
					};
				},
				function (param, body) {
					return {
						type: "CatchClause",
						param: param,
						body: body
					};
				},
				function (block) { return block; },
				function () { return { type: "DebuggerStatement" }; },
				function (id, params, body) {
					return {
						type: "FunctionDeclaration",
						id: id,
						params: optionalList(extractOptional(params, 0)),
						body: body
					};
				},
				function (id, params, body) {
					return {
						type: "FunctionExpression",
						id: extractOptional(id, 0),
						params: optionalList(extractOptional(params, 0)),
						body: body
					};
				},
				function (body) {
					return {
						type: "BlockStatement",
						body: optionalList(body)
					};
				},
				function (body) {
					return {
						type: "Program",
						body: optionalList(body)
					};
				},
				function (head, tail) {
					return buildList(head, tail, 1);
				}
			],

			peg$bytecode = [
				peg$decode("%;!/9#$;\"0#*;\"&/)$8\": \"\"! )(\"'#&'#"),
				peg$decode("%2!\"\"6!7\"/R#;\x85/I$;\xBD/@$;\x85/7$2#\"\"6#7$/($8%:%%!\")(%'#($'#(#'#(\"'#&'#"),
				peg$decode("1\"\"5!7&"),
				peg$decode("<2(\"\"6(7)._ &2*\"\"6*7+.S &2,\"\"6,7-.G &2.\"\"6.7/.; &20\"\"6071./ &22\"\"6273.# &;^=.\" 7'"),
				peg$decode("44\"\"5!75"),
				peg$decode("<27\"\"6778.M &29\"\"697:.A &2;\"\"6;7<.5 &2=\"\"6=7>.) &2?\"\"6?7@=.\" 76"),
				peg$decode("<;'.# &;)=.\" 7A"),
				peg$decode("%2B\"\"6B7C/\x8C#$%%<2D\"\"6D7E=.##&&!&'#/,#;\"/#$+\")(\"'#&'#0H*%%<2D\"\"6D7E=.##&&!&'#/,#;\"/#$+\")(\"'#&'#&/2$2D\"\"6D7E/#$+#)(#'#(\"'#&'#"),
				peg$decode("%2B\"\"6B7C/\x98#$%%<2D\"\"6D7E.# &;$=.##&&!&'#/,#;\"/#$+\")(\"'#&'#0N*%%<2D\"\"6D7E.# &;$=.##&&!&'#/,#;\"/#$+\")(\"'#&'#&/2$2D\"\"6D7E/#$+#)(#'#(\"'#&'#"),
				peg$decode("%2F\"\"6F7G/q#$%%<;$=.##&&!&'#/,#;\"/#$+\")(\"'#&'#0B*%%<;$=.##&&!&'#/,#;\"/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
				peg$decode("%%<;0=.##&&!&'#/1#;+/($8\":H\"! )(\"'#&'#"),
				peg$decode("<%;,/9#$;-0#*;-&/)$8\":J\"\"! )(\"'#&'#=.\" 7I"),
				peg$decode(";..Y &2K\"\"6K7L.M &2M\"\"6M7N.A &%2O\"\"6O7P/1#;J/($8\":Q\"! )(\"'#&'#"),
				peg$decode(";,.G &;/.A &;[.; &;].5 &2R\"\"6R7S.) &2T\"\"6T7U"),
				peg$decode(";X.; &;T.5 &;W./ &;U.) &;V.# &;\\"),
				peg$decode(";Z.# &;Y"),
				peg$decode(";1./ &;2.) &;4.# &;5"),
				peg$decode(";_.\xB3 &;`.\xAD &;a.\xA7 &;d.\xA1 &;e.\x9B &;f.\x95 &;g.\x8F &;h.\x89 &;i.\x83 &;n.} &;o.w &;p.q &;r.k &;t.e &;u._ &;v.Y &;x.S &;{.M &;|.G &;}.A &;\x7F.; &;\x80.5 &;\x81./ &;\x82.) &;\x83.# &;\x84"),
				peg$decode(";b.A &;c.; &;j.5 &;k./ &;l.) &;s.# &;z"),
				peg$decode(";4.5 &;5./ &;6.) &;@.# &;K"),
				peg$decode("%;w/& 8!:V! )"),
				peg$decode("%;~/& 8!:W! ).. &%;m/& 8!:X! )"),
				peg$decode("<%;>/C#%<;,.# &;9=.##&&!&'#/($8\":Z\"!!)(\"'#&'#.M &%;7/C#%<;,.# &;9=.##&&!&'#/($8\":Z\"!!)(\"'#&'#=.\" 7Y"),
				peg$decode("%;8/T#2[\"\"6[7\\/E$$;90#*;9&/5$;;.\" &\"/'$8$:]$ )($'#(#'#(\"'#&'#.} &%2[\"\"6[7\\/K#$;9/&#0#*;9&&&#/5$;;.\" &\"/'$8#:]# )(#'#(\"'#&'#.? &%;8/5#;;.\" &\"/'$8\":]\" )(\"'#&'#"),
				peg$decode("2^\"\"6^7_.= &%;:/3#$;90#*;9&/#$+\")(\"'#&'#"),
				peg$decode("4`\"\"5!7a"),
				peg$decode("4b\"\"5!7c"),
				peg$decode("%;</,#;=/#$+\")(\"'#&'#"),
				peg$decode("3d\"\"5!7e"),
				peg$decode("%4f\"\"5!7g.\" &\"/9#$;9/&#0#*;9&&&#/#$+\")(\"'#&'#"),
				peg$decode("%3h\"\"5\"7i/E#%$;?/&#0#*;?&&&#/\"!&,)/($8\":j\"! )(\"'#&'#"),
				peg$decode("4k\"\"5!7l"),
				peg$decode("<%2n\"\"6n7o/G#$;A0#*;A&/7$2n\"\"6n7o/($8#:p#!!)(#'#(\"'#&'#.W &%2q\"\"6q7r/G#$;B0#*;B&/7$2q\"\"6q7r/($8#:p#!!)(#'#(\"'#&'#=.\" 7m"),
				peg$decode("%%<2n\"\"6n7o./ &2O\"\"6O7P.# &;$=.##&&!&'#/0#;\"/'$8\":s\" )(\"'#&'#.G &%2O\"\"6O7P/1#;D/($8\":Q\"! )(\"'#&'#.# &;C"),
				peg$decode("%%<2q\"\"6q7r./ &2O\"\"6O7P.# &;$=.##&&!&'#/0#;\"/'$8\":s\" )(\"'#&'#.G &%2O\"\"6O7P/1#;D/($8\":Q\"! )(\"'#&'#.# &;C"),
				peg$decode("%2O\"\"6O7P/0#;%/'$8\":t\" )(\"'#&'#"),
				peg$decode(";E.X &%2^\"\"6^7_/<#%<;9=.##&&!&'#/'$8\":u\" )(\"'#&'#.) &;I.# &;J"),
				peg$decode(";F.# &;G"),
				peg$decode("2q\"\"6q7r.\xBF &2n\"\"6n7o.\xB3 &2O\"\"6O7P.\xA7 &%2v\"\"6v7w/& 8!:x! ).\x90 &%2y\"\"6y7z/& 8!:{! ).y &%2|\"\"6|7}/& 8!:~! ).b &%2\x7F\"\"6\x7F7\x80/& 8!:\x81! ).K &%2\x82\"\"6\x827\x83/& 8!:\x84! ).4 &%2\x85\"\"6\x857\x86/& 8!:\x87! )"),
				peg$decode("%%<;H.# &;$=.##&&!&'#/0#;\"/'$8\":s\" )(\"'#&'#"),
				peg$decode(";F.; &;9.5 &2\x88\"\"6\x887\x89.) &2\x8A\"\"6\x8A7\x8B"),
				peg$decode("%2\x88\"\"6\x887\x89/K#%%;?/,#;?/#$+\")(\"'#&'#/\"!&,)/($8\":\x8C\"! )(\"'#&'#"),
				peg$decode("%2\x8A\"\"6\x8A7\x8B/]#%%;?/>#;?/5$;?/,$;?/#$+$)($'#(#'#(\"'#&'#/\"!&,)/($8\":\x8C\"! )(\"'#&'#"),
				peg$decode("<%2\x8E\"\"6\x8E7\x8F/X#%;L/\"!&,)/H$2\x8E\"\"6\x8E7\x8F/9$%;S/\"!&,)/)$8$:\x90$\"\" )($'#(#'#(\"'#&'#=.\" 7\x8D"),
				peg$decode("%;M/3#$;N0#*;N&/#$+\")(\"'#&'#"),
				peg$decode("%%<4\x91\"\"5!7\x92=.##&&!&'#/,#;P/#$+\")(\"'#&'#.) &;O.# &;Q"),
				peg$decode("%%<4\x93\"\"5!7\x94=.##&&!&'#/,#;P/#$+\")(\"'#&'#.) &;O.# &;Q"),
				peg$decode("%2O\"\"6O7P/,#;P/#$+\")(\"'#&'#"),
				peg$decode("%%<;$=.##&&!&'#/,#;\"/#$+\")(\"'#&'#"),
				peg$decode("%2\x95\"\"6\x957\x96/B#$;R0#*;R&/2$2\x97\"\"6\x977\x98/#$+#)(#'#(\"'#&'#"),
				peg$decode("%%<4\x99\"\"5!7\x9A=.##&&!&'#/,#;P/#$+\")(\"'#&'#.# &;O"),
				peg$decode("$;-0#*;-&"),
				peg$decode("4\x9B\"\"5!7\x9C"),
				peg$decode("4\x9D\"\"5!7\x9E"),
				peg$decode("4\x9F\"\"5!7\xA0"),
				peg$decode("4\xA1\"\"5!7\xA2"),
				peg$decode("4\xA3\"\"5!7\xA4"),
				peg$decode("4\xA5\"\"5!7\xA6"),
				peg$decode("4\xA7\"\"5!7\xA8"),
				peg$decode("4\xA9\"\"5!7\xAA"),
				peg$decode("4\xAB\"\"5!7\xAC"),
				peg$decode("4\xAD\"\"5!7\xAE"),
				peg$decode("4\xAF\"\"5!7\xB0"),
				peg$decode("%2\xB1\"\"6\xB17\xB2/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xB3\"\"6\xB37\xB4/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xB5\"\"6\xB57\xB6/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xB7\"\"6\xB77\xB8/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xB9\"\"6\xB97\xBA/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xBB\"\"6\xBB7\xBC/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xBD\"\"6\xBD7\xBE/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xBF\"\"6\xBF7\xC0/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xC1\"\"6\xC17\xC2/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xC3\"\"6\xC37\xC4/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xC5\"\"6\xC57\xC6/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xC7\"\"6\xC77\xC8/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xC9\"\"6\xC97\xCA/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xCB\"\"6\xCB7\xCC/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xCD\"\"6\xCD7\xCE/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xCF\"\"6\xCF7\xD0/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xD1\"\"6\xD17\xD2/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xD3\"\"6\xD37\xD4/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xD5\"\"6\xD57\xD6/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xD7\"\"6\xD77\xD8/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xD9\"\"6\xD97\xDA/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xDB\"\"6\xDB7\xDC/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xDD\"\"6\xDD7\xDE/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xDF\"\"6\xDF7\xE0/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xE1\"\"6\xE17\xE2/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xE3\"\"6\xE37\xE4/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xE5\"\"6\xE57\xE6/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xE7\"\"6\xE77\xE8/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xE9\"\"6\xE97\xEA/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xEB\"\"6\xEB7\xEC/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xED\"\"6\xED7\xEE/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xEF\"\"6\xEF7\xF0/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xF1\"\"6\xF17\xF2/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xF3\"\"6\xF37\xF4/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xF5\"\"6\xF57\xF6/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xF7\"\"6\xF77\xF8/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xF9\"\"6\xF97\xFA/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("%2\xFB\"\"6\xFB7\xFC/8#%<;-=.##&&!&'#/#$+\")(\"'#&'#"),
				peg$decode("$;#.) &;%.# &;&0/*;#.) &;%.# &;&&"),
				peg$decode("$;#.# &;(0)*;#.# &;(&"),
				peg$decode("%;\x85/2#2\xFD\"\"6\xFD7\xFE/#$+\")(\"'#&'#.\x88 &%;\x86/:#;).\" &\"/,$;%/#$+#)(#'#(\"'#&'#.a &%;\x86/>#%<2\xFF\"\"6\xFF7\u0100=/##&'!&&#/#$+\")(\"'#&'#.6 &%;\x85/,#;\x88/#$+\")(\"'#&'#"),
				peg$decode("%<1\"\"5!7&=.##&&!&'#"),
				peg$decode("%;|/& 8!:\u0101! ).z &;*.t &;3.n &;\x8A.h &;\x8D.b &%2\u0102\"\"6\u01027\u0103/R#;\x85/I$;\xBD/@$;\x85/7$2\u0104\"\"6\u01047\u0105/($8%:\u0106%!\")(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%2\x95\"\"6\x957\x96/a#;\x85/X$%;\x8C/,#;\x85/#$+\")(\"'#&'#.\" &\"/7$2\x97\"\"6\x977\x98/($8$:\u0107$!!)($'#(#'#(\"'#&'#.\xE1 &%2\x95\"\"6\x957\x96/R#;\x85/I$;\x8B/@$;\x85/7$2\x97\"\"6\x977\x98/($8%:\u0108%!\")(%'#($'#(#'#(\"'#&'#.\x9C &%2\x95\"\"6\x957\x96/\x8C#;\x85/\x83$;\x8B/z$;\x85/q$2\u0109\"\"6\u01097\u010A/b$;\x85/Y$%;\x8C/,#;\x85/#$+\")(\"'#&'#.\" &\"/8$2\x97\"\"6\x977\x98/)$8(:\u010B(\"%!)(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%%%;\x8C/,#;\x85/#$+\")(\"'#&'#.\" &\"/2#;\xBA/)$8\":\u010C\"\"! )(\"'#&'#/\xDF#$%;\x85/l#2\u0109\"\"6\u01097\u010A/]$;\x85/T$%;\x8C/,#;\x85/#$+\")(\"'#&'#.\" &\"/3$;\xBA/*$8%:\u010D%#'! )(%'#($'#(#'#(\"'#&'#0v*%;\x85/l#2\u0109\"\"6\u01097\u010A/]$;\x85/T$%;\x8C/,#;\x85/#$+\")(\"'#&'#.\" &\"/3$;\xBA/*$8%:\u010D%#'! )(%'#($'#(#'#(\"'#&'#&/)$8\":\u010E\"\"! )(\"'#&'#"),
				peg$decode("%2\u0109\"\"6\u01097\u010A/j#$%;\x85/2#2\u0109\"\"6\u01097\u010A/#$+\")(\"'#&'#0<*%;\x85/2#2\u0109\"\"6\u01097\u010A/#$+\")(\"'#&'#&/($8\":\u010F\"! )(\"'#&'#"),
				peg$decode("%2\u0110\"\"6\u01107\u0111/?#;\x85/6$2\xFF\"\"6\xFF7\u0100/'$8#:\u0112# )(#'#(\"'#&'#.\xBF &%2\u0110\"\"6\u01107\u0111/R#;\x85/I$;\x8E/@$;\x85/7$2\xFF\"\"6\xFF7\u0100/($8%:\u0113%!\")(%'#($'#(#'#(\"'#&'#.z &%2\u0110\"\"6\u01107\u0111/j#;\x85/a$;\x8E/X$;\x85/O$2\u0109\"\"6\u01097\u010A/@$;\x85/7$2\xFF\"\"6\xFF7\u0100/($8':\u0113'!$)(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;\x8F/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\x8F/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\x8F/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0114\"\"! )(\"'#&'#"),
				peg$decode("%;\x90/S#;\x85/J$2\u0115\"\"6\u01157\u0116/;$;\x85/2$;\xBA/)$8%:\u0117%\"$ )(%'#($'#(#'#(\"'#&'#.\u0164 &%;q/\xAD#;\x85/\xA4$;\x90/\x9B$;\x85/\x92$2\u0102\"\"6\u01027\u0103/\x83$;\x85/z$2\u0104\"\"6\u01047\u0105/k$;\x85/b$2\u0110\"\"6\u01107\u0111/S$;\x85/J$;\xDF/A$;\x85/8$2\xFF\"\"6\xFF7\u0100/)$8-:\u0118-\"*\")(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\xCA &%;y/\xC0#;\x85/\xB7$;\x90/\xAE$;\x85/\xA5$2\u0102\"\"6\u01027\u0103/\x96$;\x85/\x8D$;\x91/\x84$;\x85/{$2\u0104\"\"6\u01047\u0105/l$;\x85/c$2\u0110\"\"6\u01107\u0111/T$;\x85/K$;\xDF/B$;\x85/9$2\xFF\"\"6\xFF7\u0100/*$8/:\u0119/#,(\")(/'#(.'#(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode(";+.) &;@.# &;6"),
				peg$decode("%;*/' 8!:\u011A!! )"),
				peg$decode("%;\x89.] &;\xDD.W &%;v/M#;\x85/D$;\x92/;$;\x85/2$;\x95/)$8%:\u011B%\"\" )(%'#($'#(#'#(\"'#&'#/\u0139#$%;\x85/b#2\x95\"\"6\x957\x96/S$;\x85/J$;\xBD/A$;\x85/8$2\x97\"\"6\x977\x98/)$8&:\u011C&\"(\")(&'#(%'#($'#(#'#(\"'#&'#.T &%;\x85/J#2[\"\"6[7\\/;$;\x85/2$;+/)$8$:\u011D$\"& )($'#(#'#(\"'#&'#0\xA3*%;\x85/b#2\x95\"\"6\x957\x96/S$;\x85/J$;\xBD/A$;\x85/8$2\x97\"\"6\x977\x98/)$8&:\u011C&\"(\")(&'#(%'#($'#(#'#(\"'#&'#.T &%;\x85/J#2[\"\"6[7\\/;$;\x85/2$;+/)$8$:\u011D$\"& )($'#(#'#(\"'#&'#&/)$8\":\u011E\"\"! )(\"'#&'#"),
				peg$decode(";\x92.D &%;v/:#;\x85/1$;\x93/($8#:\u011F#! )(#'#(\"'#&'#"),
				peg$decode("%%;\x92/;#;\x85/2$;\x95/)$8#:\u0120#\"\" )(#'#(\"'#&'#/\u0177#$%;\x85/2#;\x95/)$8\":\u0121\"\"$ )(\"'#&'#.\xA3 &%;\x85/b#2\x95\"\"6\x957\x96/S$;\x85/J$;\xBD/A$;\x85/8$2\x97\"\"6\x977\x98/)$8&:\u0122&\"(\")(&'#(%'#($'#(#'#(\"'#&'#.T &%;\x85/J#2[\"\"6[7\\/;$;\x85/2$;+/)$8$:\u0123$\"& )($'#(#'#(\"'#&'#0\xC2*%;\x85/2#;\x95/)$8\":\u0121\"\"$ )(\"'#&'#.\xA3 &%;\x85/b#2\x95\"\"6\x957\x96/S$;\x85/J$;\xBD/A$;\x85/8$2\x97\"\"6\x977\x98/)$8&:\u0122&\"(\")(&'#(%'#($'#(#'#(\"'#&'#.T &%;\x85/J#2[\"\"6[7\\/;$;\x85/2$;+/)$8$:\u0123$\"& )($'#(#'#(\"'#&'#&/)$8\":\u0124\"\"! )(\"'#&'#"),
				peg$decode("%2\u0102\"\"6\u01027\u0103/a#;\x85/X$%;\x96/,#;\x85/#$+\")(\"'#&'#.\" &\"/7$2\u0104\"\"6\u01047\u0105/($8$:\u0125$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;\xBA/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xBA/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xBA/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0114\"\"! )(\"'#&'#"),
				peg$decode(";\x94.# &;\x93"),
				peg$decode("%;\x97/;#;\x86/2$;\x99/)$8#:\u0126#\"\" )(#'#(\"'#&'#.# &;\x97"),
				peg$decode("2\u0127\"\"6\u01277\u0128.) &2\u0129\"\"6\u01297\u012A"),
				peg$decode(";\x98.E &%;\x9B/;#;\x85/2$;\x9A/)$8#:\u012B#\"\" )(#'#(\"'#&'#"),
				peg$decode("%;g/\"!&,).\xD7 &%;\x82/\"!&,).\xCA &%;\x80/\"!&,).\xBD &2\u0127\"\"6\u01277\u0128.\xB1 &2\u0129\"\"6\u01297\u012A.\xA5 &%%2\u012C\"\"6\u012C7\u012D/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).m &%%2\u0130\"\"6\u01307\u0131/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).5 &2\u0132\"\"6\u01327\u0133.) &2\u0134\"\"6\u01347\u0135"),
				peg$decode("%;\x9A/\x83#$%;\x85/>#;\x9D/5$;\x85/,$;\x9A/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\x9D/5$;\x85/,$;\x9A/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%%2\u0137\"\"6\u01377\u0138/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).\x8D &%%2\x8E\"\"6\x8E7\x8F/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).U &%%2\u0139\"\"6\u01397\u013A/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,)"),
				peg$decode("%;\x9C/\x83#$%;\x85/>#;\x9F/5$;\x85/,$;\x9C/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\x9F/5$;\x85/,$;\x9C/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%%2\u012C\"\"6\u012C7\u012D/>#%<4\u013B\"\"5!7\u013C=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).U &%%2\u0130\"\"6\u01307\u0131/>#%<4\u013D\"\"5!7\u013E=.##&&!&'#/#$+\")(\"'#&'#/\"!&,)"),
				peg$decode("%;\x9E/\x83#$%;\x85/>#;\xA1/5$;\x85/,$;\x9E/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xA1/5$;\x85/,$;\x9E/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%%2\u013F\"\"6\u013F7\u0140/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).\x8D &%%2\u0141\"\"6\u01417\u0142/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).U &%%2\u0143\"\"6\u01437\u0144/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,)"),
				peg$decode("%;\xA0/\x83#$%;\x85/>#;\xA3/5$;\x85/,$;\xA0/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xA3/5$;\x85/,$;\xA0/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("2\u0145\"\"6\u01457\u0146.\xB3 &2\u0147\"\"6\u01477\u0148.\xA7 &%%2\u0149\"\"6\u01497\u014A/>#%<2\u0149\"\"6\u01497\u014A=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).o &%%2\u014B\"\"6\u014B7\u014C/>#%<2\u014B\"\"6\u014B7\u014C=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).7 &%;t/\"!&,).* &%;u/\"!&,)"),
				peg$decode("%;\xA0/\x83#$%;\x85/>#;\xA5/5$;\x85/,$;\xA0/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xA5/5$;\x85/,$;\xA0/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("2\u0145\"\"6\u01457\u0146.\xA6 &2\u0147\"\"6\u01477\u0148.\x9A &%%2\u0149\"\"6\u01497\u014A/>#%<2\u0149\"\"6\u01497\u014A=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).b &%%2\u014B\"\"6\u014B7\u014C/>#%<2\u014B\"\"6\u014B7\u014C=.##&&!&'#/#$+\")(\"'#&'#/\"!&,).* &%;t/\"!&,)"),
				peg$decode("%;\xA2/\x83#$%;\x85/>#;\xA8/5$;\x85/,$;\xA2/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xA8/5$;\x85/,$;\xA2/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%;\xA4/\x83#$%;\x85/>#;\xA8/5$;\x85/,$;\xA4/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xA8/5$;\x85/,$;\xA4/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("2\u014D\"\"6\u014D7\u014E.A &2\u014F\"\"6\u014F7\u0150.5 &2\u0151\"\"6\u01517\u0152.) &2\u0153\"\"6\u01537\u0154"),
				peg$decode("%;\xA6/\x83#$%;\x85/>#;\xAB/5$;\x85/,$;\xA6/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xAB/5$;\x85/,$;\xA6/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%;\xA7/\x83#$%;\x85/>#;\xAB/5$;\x85/,$;\xA7/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xAB/5$;\x85/,$;\xA7/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%%2\u0155\"\"6\u01557\u0156/>#%<4\u0157\"\"5!7\u0158=.##&&!&'#/#$+\")(\"'#&'#/\"!&,)"),
				peg$decode("%;\xA9/\x83#$%;\x85/>#;\xAE/5$;\x85/,$;\xA9/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xAE/5$;\x85/,$;\xA9/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%;\xAA/\x83#$%;\x85/>#;\xAE/5$;\x85/,$;\xAA/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xAE/5$;\x85/,$;\xAA/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%%2\u0159\"\"6\u01597\u015A/>#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/#$+\")(\"'#&'#/\"!&,)"),
				peg$decode("%;\xAC/\x83#$%;\x85/>#;\xB1/5$;\x85/,$;\xAC/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xB1/5$;\x85/,$;\xAC/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%;\xAD/\x83#$%;\x85/>#;\xB1/5$;\x85/,$;\xAD/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xB1/5$;\x85/,$;\xAD/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0136\"\"! )(\"'#&'#"),
				peg$decode("%%2\u015B\"\"6\u015B7\u015C/>#%<4\u015D\"\"5!7\u015E=.##&&!&'#/#$+\")(\"'#&'#/\"!&,)"),
				peg$decode("%;\xAF/\x83#$%;\x85/>#;\xB4/5$;\x85/,$;\xAF/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xB4/5$;\x85/,$;\xAF/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u015F\"\"! )(\"'#&'#"),
				peg$decode("%;\xB0/\x83#$%;\x85/>#;\xB4/5$;\x85/,$;\xB0/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xB4/5$;\x85/,$;\xB0/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u015F\"\"! )(\"'#&'#"),
				peg$decode("2\u0160\"\"6\u01607\u0161"),
				peg$decode("%;\xB2/\x83#$%;\x85/>#;\xB7/5$;\x85/,$;\xB2/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xB7/5$;\x85/,$;\xB2/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u015F\"\"! )(\"'#&'#"),
				peg$decode("%;\xB3/\x83#$%;\x85/>#;\xB7/5$;\x85/,$;\xB3/#$+$)($'#(#'#(\"'#&'#0H*%;\x85/>#;\xB7/5$;\x85/,$;\xB3/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u015F\"\"! )(\"'#&'#"),
				peg$decode("2\u0162\"\"6\u01627\u0163"),
				peg$decode("%;\xB5/~#;\x85/u$2\u0164\"\"6\u01647\u0165/f$;\x85/]$;\xBA/T$;\x85/K$2\u0115\"\"6\u01157\u0116/<$;\x85/3$;\xBA/*$8):\u0166)#($ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.# &;\xB5"),
				peg$decode("%;\xB6/~#;\x85/u$2\u0164\"\"6\u01647\u0165/f$;\x85/]$;\xBA/T$;\x85/K$2\u0115\"\"6\u01157\u0116/<$;\x85/3$;\xBB/*$8):\u0166)#($ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.# &;\xB6"),
				peg$decode("%;\x97/n#;\x85/e$2\u012E\"\"6\u012E7\u012F/V$%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/;$;\x85/2$;\xBA/)$8&:\u0167&\"% )(&'#(%'#($'#(#'#(\"'#&'#.^ &%;\x97/N#;\x85/E$;\xBC/<$;\x85/3$;\xBA/*$8%:\u0168%#$\" )(%'#($'#(#'#(\"'#&'#.# &;\xB8"),
				peg$decode("%;\x97/n#;\x85/e$2\u012E\"\"6\u012E7\u012F/V$%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/;$;\x85/2$;\xBB/)$8&:\u0167&\"% )(&'#(%'#($'#(#'#(\"'#&'#.^ &%;\x97/N#;\x85/E$;\xBC/<$;\x85/3$;\xBB/*$8%:\u0168%#$\" )(%'#($'#(#'#(\"'#&'#.# &;\xB9"),
				peg$decode("2\u0169\"\"6\u01697\u016A.\x95 &2\u016B\"\"6\u016B7\u016C.\x89 &2\u016D\"\"6\u016D7\u016E.} &2\u016F\"\"6\u016F7\u0170.q &2\u0171\"\"6\u01717\u0172.e &2\u0173\"\"6\u01737\u0174.Y &2\u0175\"\"6\u01757\u0176.M &2\u0177\"\"6\u01777\u0178.A &2\u0179\"\"6\u01797\u017A.5 &2\u017B\"\"6\u017B7\u017C.) &2\u017D\"\"6\u017D7\u017E"),
				peg$decode("%;\xBA/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xBA/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xBA/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u017F\"\"! )(\"'#&'#"),
				peg$decode("%;\xBB/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xBB/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xBB/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u017F\"\"! )(\"'#&'#"),
				peg$decode(";\xC0.q &;\xC2.k &;\xC9.e &;\xCA._ &;\xCB.Y &;\xCC.S &;\xCD.M &;\xCE.G &;\xCF.A &;\xD0.; &;\xD6.5 &;\xD1./ &;\xD7.) &;\xD8.# &;\xDB"),
				peg$decode("%2\u0110\"\"6\u01107\u0111/a#;\x85/X$%;\xC1/,#;\x85/#$+\")(\"'#&'#.\" &\"/7$2\xFF\"\"6\xFF7\u0100/($8$:\u0180$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;\xBF/_#$%;\x85/,#;\xBF/#$+\")(\"'#&'#06*%;\x85/,#;\xBF/#$+\")(\"'#&'#&/)$8\":\u0181\"\"! )(\"'#&'#"),
				peg$decode("%;\x81/C#;\x85/:$;\xC3/1$;\x87/($8$:\u0182$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;\xC5/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xC5/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xC5/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0114\"\"! )(\"'#&'#"),
				peg$decode("%;\xC6/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xC6/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;\xC6/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0114\"\"! )(\"'#&'#"),
				peg$decode("%;*/J#%;\x85/,#;\xC7/#$+\")(\"'#&'#.\" &\"/)$8\":\u0183\"\"! )(\"'#&'#"),
				peg$decode("%;*/J#%;\x85/,#;\xC8/#$+\")(\"'#&'#.\" &\"/)$8\":\u0183\"\"! )(\"'#&'#"),
				peg$decode("%2\u012E\"\"6\u012E7\u012F/U#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/:$;\x85/1$;\xBA/($8$:\u0106$! )($'#(#'#(\"'#&'#"),
				peg$decode("%2\u012E\"\"6\u012E7\u012F/U#%<2\u012E\"\"6\u012E7\u012F=.##&&!&'#/:$;\x85/1$;\xBB/($8$:\u0106$! )($'#(#'#(\"'#&'#"),
				peg$decode("%2\xFD\"\"6\xFD7\xFE/& 8!:\u0184! )"),
				peg$decode("%%<2\u0110\"\"6\u01107\u0111.# &;p=.##&&!&'#/:#;\xBD/1$;\x87/($8#:\u0185#!!)(#'#(\"'#&'#"),
				peg$decode("%;r/\xA2#;\x85/\x99$2\u0102\"\"6\u01027\u0103/\x8A$;\x85/\x81$;\xBD/x$;\x85/o$2\u0104\"\"6\u01047\u0105/`$;\x85/W$;\xBF/N$;\x85/E$;i/<$;\x85/3$;\xBF/*$8-:\u0186-#($ )(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\x87 &%;r/}#;\x85/t$2\u0102\"\"6\u01027\u0103/e$;\x85/\\$;\xBD/S$;\x85/J$2\u0104\"\"6\u01047\u0105/;$;\x85/2$;\xBF/)$8):\u0187)\"$ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;h/\x98#;\x85/\x8F$;\xBF/\x86$;\x85/}$;\x83/t$;\x85/k$2\u0102\"\"6\u01027\u0103/\\$;\x85/S$;\xBD/J$;\x85/A$2\u0104\"\"6\u01047\u0105/2$;\x87/)$8,:\u0188,\")#)(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0394 &%;\x83/}#;\x85/t$2\u0102\"\"6\u01027\u0103/e$;\x85/\\$;\xBD/S$;\x85/J$2\u0104\"\"6\u01047\u0105/;$;\x85/2$;\xBF/)$8):\u0189)\"$ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u032A &%;o/\u0100#;\x85/\xF7$2\u0102\"\"6\u01027\u0103/\xE8$;\x85/\xDF$%;\xBE/,#;\x85/#$+\")(\"'#&'#.\" &\"/\xBE$2\xFD\"\"6\xFD7\xFE/\xAF$;\x85/\xA6$%;\xBD/,#;\x85/#$+\")(\"'#&'#.\" &\"/\x85$2\xFD\"\"6\xFD7\xFE/v$;\x85/m$%;\xBD/,#;\x85/#$+\")(\"'#&'#.\" &\"/L$2\u0104\"\"6\u01047\u0105/=$;\x85/4$;\xBF/+$8.:\u018A.$)&# )(.'#(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u023D &%;o/\u0103#;\x85/\xFA$2\u0102\"\"6\u01027\u0103/\xEB$;\x85/\xE2$;\x81/\xD9$;\x85/\xD0$;\xC4/\xC7$;\x85/\xBE$2\xFD\"\"6\xFD7\xFE/\xAF$;\x85/\xA6$%;\xBD/,#;\x85/#$+\")(\"'#&'#.\" &\"/\x85$2\xFD\"\"6\xFD7\xFE/v$;\x85/m$%;\xBD/,#;\x85/#$+\")(\"'#&'#.\" &\"/L$2\u0104\"\"6\u01047\u0105/=$;\x85/4$;\xBF/+$81:\u018B1$*&# )(1'#(0'#(/'#(.'#(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u014D &%;o/\xA2#;\x85/\x99$2\u0102\"\"6\u01027\u0103/\x8A$;\x85/\x81$;\x97/x$;\x85/o$;u/f$;\x85/]$;\xBD/T$;\x85/K$2\u0104\"\"6\u01047\u0105/<$;\x85/3$;\xBF/*$8-:\u018C-#($ )(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\xBE &%;o/\xB4#;\x85/\xAB$2\u0102\"\"6\u01027\u0103/\x9C$;\x85/\x93$;\x81/\x8A$;\x85/\x81$;\xC4/x$;\x85/o$;u/f$;\x85/]$;\xBD/T$;\x85/K$2\u0104\"\"6\u01047\u0105/<$;\x85/3$;\xBF/*$8/:\u018D/#($ )(/'#(.'#(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;d/0#;\x87/'$8\":\u018E\" )(\"'#&'#.M &%;d/C#;\x86/:$;*/1$;\x87/($8$:\u018F$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;_/0#;\x87/'$8\":\u0190\" )(\"'#&'#.M &%;_/C#;\x86/:$;*/1$;\x87/($8$:\u0191$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;x/0#;\x87/'$8\":\u0192\" )(\"'#&'#.M &%;x/C#;\x86/:$;\xBD/1$;\x87/($8$:\u0193$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;\x84/}#;\x85/t$2\u0102\"\"6\u01027\u0103/e$;\x85/\\$;\xBD/S$;\x85/J$2\u0104\"\"6\u01047\u0105/;$;\x85/2$;\xBF/)$8):\u0194)\"$ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;{/}#;\x85/t$2\u0102\"\"6\u01027\u0103/e$;\x85/\\$;\xBD/S$;\x85/J$2\u0104\"\"6\u01047\u0105/;$;\x85/2$;\xD2/)$8):\u0195)\"$ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%2\u0110\"\"6\u01107\u0111/a#;\x85/X$%;\xD3/,#;\x85/#$+\")(\"'#&'#.\" &\"/7$2\xFF\"\"6\xFF7\u0100/($8$:\u0196$!!)($'#(#'#(\"'#&'#.\xA6 &%2\u0110\"\"6\u01107\u0111/\x96#;\x85/\x8D$%;\xD3/,#;\x85/#$+\")(\"'#&'#.\" &\"/l$;\xD5/c$;\x85/Z$%;\xD3/,#;\x85/#$+\")(\"'#&'#.\" &\"/9$2\xFF\"\"6\xFF7\u0100/*$8':\u0197'#$#!)(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;\xD4/_#$%;\x85/,#;\xD4/#$+\")(\"'#&'#06*%;\x85/,#;\xD4/#$+\")(\"'#&'#&/)$8\":\u0181\"\"! )(\"'#&'#"),
				peg$decode("%;`/t#;\x85/k$;\xBD/b$;\x85/Y$2\u0115\"\"6\u01157\u0116/J$%;\x85/,#;\xC1/#$+\")(\"'#&'#.\" &\"/)$8&:\u0198&\"# )(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;f/a#;\x85/X$2\u0115\"\"6\u01157\u0116/I$%;\x85/,#;\xC1/#$+\")(\"'#&'#.\" &\"/($8$:\u0199$! )($'#(#'#(\"'#&'#"),
				peg$decode("%;*/S#;\x85/J$2\u0115\"\"6\u01157\u0116/;$;\x85/2$;\xBF/)$8%:\u019A%\"$ )(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;}/C#;\x86/:$;\xBD/1$;\x87/($8$:\u019B$!!)($'#(#'#(\"'#&'#"),
				peg$decode("%;\x7F/`#;\x85/W$;\xC0/N$;\x85/E$;\xD9/<$;\x85/3$;\xDA/*$8':\u019C'#$\" )(''#(&'#(%'#($'#(#'#(\"'#&'#.\x91 &%;\x7F/M#;\x85/D$;\xC0/;$;\x85/2$;\xD9/)$8%:\u019D%\"\" )(%'#($'#(#'#(\"'#&'#.W &%;\x7F/M#;\x85/D$;\xC0/;$;\x85/2$;\xDA/)$8%:\u019E%\"\" )(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;a/}#;\x85/t$2\u0102\"\"6\u01027\u0103/e$;\x85/\\$;*/S$;\x85/J$2\u0104\"\"6\u01047\u0105/;$;\x85/2$;\xC0/)$8):\u019F)\"$ )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;n/:#;\x85/1$;\xC0/($8#:\u01A0#! )(#'#(\"'#&'#"),
				peg$decode("%;e/0#;\x87/'$8\":\u01A1\" )(\"'#&'#"),
				peg$decode("%;p/\xCF#;\x85/\xC6$;*/\xBD$;\x85/\xB4$2\u0102\"\"6\u01027\u0103/\xA5$;\x85/\x9C$%;\xDE/,#;\x85/#$+\")(\"'#&'#.\" &\"/{$2\u0104\"\"6\u01047\u0105/l$;\x85/c$2\u0110\"\"6\u01107\u0111/T$;\x85/K$;\xDF/B$;\x85/9$2\xFF\"\"6\xFF7\u0100/*$8.:\u01A2.#+'\")(.'#(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;p/\xDE#;\x85/\xD5$%;*/,#;\x85/#$+\")(\"'#&'#.\" &\"/\xB4$2\u0102\"\"6\u01027\u0103/\xA5$;\x85/\x9C$%;\xDE/,#;\x85/#$+\")(\"'#&'#.\" &\"/{$2\u0104\"\"6\u01047\u0105/l$;\x85/c$2\u0110\"\"6\u01107\u0111/T$;\x85/K$;\xDF/B$;\x85/9$2\xFF\"\"6\xFF7\u0100/*$8-:\u01A3-#*'\")(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
				peg$decode("%;*/\x8F#$%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;*/#$+$)($'#(#'#(\"'#&'#0N*%;\x85/D#2\u0109\"\"6\u01097\u010A/5$;\x85/,$;*/#$+$)($'#(#'#(\"'#&'#&/)$8\":\u0114\"\"! )(\"'#&'#"),
				peg$decode("%;\xE1.\" &\"/' 8!:\u01A4!! )"),
				peg$decode("%;\xE1.\" &\"/' 8!:\u01A5!! )"),
				peg$decode("%;\xE2/_#$%;\x85/,#;\xE2/#$+\")(\"'#&'#06*%;\x85/,#;\xE2/#$+\")(\"'#&'#&/)$8\":\u01A6\"\"! )(\"'#&'#"),
				peg$decode(";\xBF.# &;\xDC")
			],

			peg$currPos = 0,
			peg$savedPos = 0,
			peg$posDetailsCache = [{ line: 1, column: 1 }],
			peg$maxFailPos = 0,
			peg$maxFailExpected = [],
			peg$silentFails = 0,

			peg$result;

		if ("startRule" in options) {
			if (!(options.startRule in peg$startRuleIndices)) {
				throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
			}

			peg$startRuleIndex = peg$startRuleIndices[options.startRule];
		}

		function text() {
			return input.substring(peg$savedPos, peg$currPos);
		}

		function location() {
			return peg$computeLocation(peg$savedPos, peg$currPos);
		}

		function expected(description, location) {
			location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

			throw peg$buildStructuredError(
				[peg$otherExpectation(description)],
				input.substring(peg$savedPos, peg$currPos),
				location
			);
		}

		function error(message, location) {
			location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

			throw peg$buildSimpleError(message, location);
		}

		function peg$literalExpectation(text, ignoreCase) {
			return { type: "literal", text: text, ignoreCase: ignoreCase };
		}

		function peg$classExpectation(parts, inverted, ignoreCase) {
			return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
		}

		function peg$anyExpectation() {
			return { type: "any" };
		}

		function peg$endExpectation() {
			return { type: "end" };
		}

		function peg$otherExpectation(description) {
			return { type: "other", description: description };
		}

		function peg$computePosDetails(pos) {
			var details = peg$posDetailsCache[pos], p;

			if (details) {
				return details;
			} else {
				p = pos - 1;
				while (!peg$posDetailsCache[p]) {
					p--;
				}

				details = peg$posDetailsCache[p];
				details = {
					line: details.line,
					column: details.column
				};

				while (p < pos) {
					if (input.charCodeAt(p) === 10) {
						details.line++;
						details.column = 1;
					} else {
						details.column++;
					}

					p++;
				}

				peg$posDetailsCache[pos] = details;
				return details;
			}
		}

		function peg$computeLocation(startPos, endPos) {
			var startPosDetails = peg$computePosDetails(startPos),
				endPosDetails = peg$computePosDetails(endPos);

			return {
				start: {
					offset: startPos,
					line: startPosDetails.line,
					column: startPosDetails.column
				},
				end: {
					offset: endPos,
					line: endPosDetails.line,
					column: endPosDetails.column
				}
			};
		}

		function peg$fail(expected) {
			if (peg$currPos < peg$maxFailPos) { return; }

			if (peg$currPos > peg$maxFailPos) {
				peg$maxFailPos = peg$currPos;
				peg$maxFailExpected = [];
			}

			peg$maxFailExpected.push(expected);
		}

		function peg$buildSimpleError(message, location) {
			return new peg$SyntaxError(message, null, null, location);
		}

		function peg$buildStructuredError(expected, found, location) {
			return new peg$SyntaxError(
				peg$SyntaxError.buildMessage(expected, found),
				expected,
				found,
				location
			);
		}

		function peg$decode(s) {
			var bc = new Array(s.length), i;

			for (i = 0; i < s.length; i++) {
				bc[i] = s.charCodeAt(i) - 32;
			}

			return bc;
		}

		function peg$parseRule(index) {
			var bc = peg$bytecode[index],
				ip = 0,
				ips = [],
				end = bc.length,
				ends = [],
				stack = [],
				params, i;

			while (true) {
				while (ip < end) {
					switch (bc[ip]) {
						case 0:
							stack.push(peg$consts[bc[ip + 1]]);
							ip += 2;
							break;

						case 1:
							stack.push(void 0);
							ip++;
							break;

						case 2:
							stack.push(null);
							ip++;
							break;

						case 3:
							stack.push(peg$FAILED);
							ip++;
							break;

						case 4:
							stack.push([]);
							ip++;
							break;

						case 5:
							stack.push(peg$currPos);
							ip++;
							break;

						case 6:
							stack.pop();
							ip++;
							break;

						case 7:
							peg$currPos = stack.pop();
							ip++;
							break;

						case 8:
							stack.length -= bc[ip + 1];
							ip += 2;
							break;

						case 9:
							stack.splice(-2, 1);
							ip++;
							break;

						case 10:
							stack[stack.length - 2].push(stack.pop());
							ip++;
							break;

						case 11:
							stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
							ip += 2;
							break;

						case 12:
							stack.push(input.substring(stack.pop(), peg$currPos));
							ip++;
							break;

						case 13:
							ends.push(end);
							ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

							if (stack[stack.length - 1]) {
								end = ip + 3 + bc[ip + 1];
								ip += 3;
							} else {
								end = ip + 3 + bc[ip + 1] + bc[ip + 2];
								ip += 3 + bc[ip + 1];
							}

							break;

						case 14:
							ends.push(end);
							ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

							if (stack[stack.length - 1] === peg$FAILED) {
								end = ip + 3 + bc[ip + 1];
								ip += 3;
							} else {
								end = ip + 3 + bc[ip + 1] + bc[ip + 2];
								ip += 3 + bc[ip + 1];
							}

							break;

						case 15:
							ends.push(end);
							ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

							if (stack[stack.length - 1] !== peg$FAILED) {
								end = ip + 3 + bc[ip + 1];
								ip += 3;
							} else {
								end = ip + 3 + bc[ip + 1] + bc[ip + 2];
								ip += 3 + bc[ip + 1];
							}

							break;

						case 16:
							if (stack[stack.length - 1] !== peg$FAILED) {
								ends.push(end);
								ips.push(ip);

								end = ip + 2 + bc[ip + 1];
								ip += 2;
							} else {
								ip += 2 + bc[ip + 1];
							}

							break;

						case 17:
							ends.push(end);
							ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

							if (input.length > peg$currPos) {
								end = ip + 3 + bc[ip + 1];
								ip += 3;
							} else {
								end = ip + 3 + bc[ip + 1] + bc[ip + 2];
								ip += 3 + bc[ip + 1];
							}

							break;

						case 18:
							ends.push(end);
							ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

							if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
								end = ip + 4 + bc[ip + 2];
								ip += 4;
							} else {
								end = ip + 4 + bc[ip + 2] + bc[ip + 3];
								ip += 4 + bc[ip + 2];
							}

							break;

						case 19:
							ends.push(end);
							ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

							if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
								end = ip + 4 + bc[ip + 2];
								ip += 4;
							} else {
								end = ip + 4 + bc[ip + 2] + bc[ip + 3];
								ip += 4 + bc[ip + 2];
							}

							break;

						case 20:
							ends.push(end);
							ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

							if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
								end = ip + 4 + bc[ip + 2];
								ip += 4;
							} else {
								end = ip + 4 + bc[ip + 2] + bc[ip + 3];
								ip += 4 + bc[ip + 2];
							}

							break;

						case 21:
							stack.push(input.substr(peg$currPos, bc[ip + 1]));
							peg$currPos += bc[ip + 1];
							ip += 2;
							break;

						case 22:
							stack.push(peg$consts[bc[ip + 1]]);
							peg$currPos += peg$consts[bc[ip + 1]].length;
							ip += 2;
							break;

						case 23:
							stack.push(peg$FAILED);
							if (peg$silentFails === 0) {
								peg$fail(peg$consts[bc[ip + 1]]);
							}
							ip += 2;
							break;

						case 24:
							peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
							ip += 2;
							break;

						case 25:
							peg$savedPos = peg$currPos;
							ip++;
							break;

						case 26:
							params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
							for (i = 0; i < bc[ip + 3]; i++) {
								params[i] = stack[stack.length - 1 - params[i]];
							}

							stack.splice(
								stack.length - bc[ip + 2],
								bc[ip + 2],
								peg$consts[bc[ip + 1]].apply(null, params)
							);

							ip += 4 + bc[ip + 3];
							break;

						case 27:
							stack.push(peg$parseRule(bc[ip + 1]));
							ip += 2;
							break;

						case 28:
							peg$silentFails++;
							ip++;
							break;

						case 29:
							peg$silentFails--;
							ip++;
							break;

						default:
							throw new Error("Invalid opcode: " + bc[ip] + ".");
					}
				}

				if (ends.length > 0) {
					end = ends.pop();
					ip = ips.pop();
				} else {
					break;
				}
			}

			return stack[0];
		}


		var TYPES_TO_PROPERTY_NAMES = {
			CallExpression: "callee",
			MemberExpression: "object",
		};

		function filledArray(count, value) {
			return Array.apply(null, new Array(count))
				.map(function () { return value; });
		}

		function extractOptional(optional, index) {
			return optional ? optional[index] : null;
		}

		function extractList(list, index) {
			return list.map(function (element) { return element[index]; });
		}

		function buildList(head, tail, index) {
			return [head].concat(extractList(tail, index));
		}

		function buildBinaryExpression(head, tail) {
			return tail.reduce(function (result, element) {
				return {
					type: "BinaryExpression",
					operator: element[1],
					left: result,
					right: element[3]
				};
			}, head);
		}

		function buildLogicalExpression(head, tail) {
			return tail.reduce(function (result, element) {
				return {
					type: "LogicalExpression",
					operator: element[1],
					left: result,
					right: element[3]
				};
			}, head);
		}

		function optionalList(value) {
			return value !== null ? value : [];
		}


		peg$result = peg$parseRule(peg$startRuleIndex);

		if (peg$result !== peg$FAILED && peg$currPos === input.length) {
			return peg$result;
		} else {
			if (peg$result !== peg$FAILED && peg$currPos < input.length) {
				peg$fail(peg$endExpectation());
			}

			throw peg$buildStructuredError(
				peg$maxFailExpected,
				peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
				peg$maxFailPos < input.length
					? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
					: peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
			);
		}
	}

	return {
		SyntaxError: peg$SyntaxError,
		parse: peg$parse
	};
})();

window.JsExpression = JsExpression;

window.JsExpression2 = JsExpression;

/*
	Import
*/
function ImportInstanceHeader() {
	this.url = "";
	this.method = "GET";
	this.data = {};
	this.query = {};
	this.json = false;
	this.type = "application/x-www-form-urlencoded";
	this.headers = {};
};
ImportInstanceHeader.prototype.formatQuery = function() {
	var arr = [], str;
	for(var name in this.query) {
		arr.push(name + '=' + encodeURIComponent(this.query[name]));
	}
	str = arr.join('&');
	if(str != '') {
		if( this.url.indexOf('?') < 0 ) {
			return "?" + str;
		} else {
			return "&" + str;
		}
	} else {
		return "";
	}
}
ImportInstanceHeader.prototype.formatBody = function() {
	if(this.type == "application/x-www-form-urlencoded") {
		var arr = [], str;
		for(var name in this.data) {
			arr.push(name + '=' + encodeURIComponent(this.data[name]));
		}
		str = arr.join('&');
		if(str != '') {
			return this.method == "GET" ? 
				(this.url.indexOf('?') < 0 ? '?' + str : '&' + str) : 
				str;
		}
		return '';
	} else if(this.type == "application/json") {
		return JSON.stringify(this.data);
	} else if(this.type == "application/octet-stream") {
		return this.data;
	} else {
		if(Object.prototype.toString.apply(data) == "[object String]") {
			return this.data;
		} else {
			throw "body on import is raw but not string.";
		}
	}
}
function Import(opt) {
	if(!( this instanceof Import )) return new Import(opt);
	this.host = {};
	this.doneCallback = null;
	this.failCallback = null;
	this.xhr = null;
	this.info = new ImportInstanceHeader;
	if(Object.prototype.toString.apply(opt)=="[object String]") {
		this.info.url = opt;
	}
	if(Object.prototype.toString.apply(opt)=="[object Object]") {
		if("url" in opt) this.info.url = opt.url;
		if("method" in opt) this.info.method = opt.method.toUpperCase();
		if("query" in opt) this.info.query = opt.query;
		if("data" in opt) {
			this.info.data = opt.data;
			if("body" in opt) this.info.data = opt.body;
		} else {
			if("body" in opt) this.info.data = opt.body;
		}
		if("json" in opt) this.info.json = opt.json;
		if("type" in opt) this.info.type = opt.type;
	}
}
Import.Form = "application/x-www-form-urlencoded";
Import.Json = "application/json";
Import.Js = "application/javascript";
Import.Binary = "application/octet-stream";
Import.Raw = "text/plain";
Import.prototype.done = function(callback) { this.doneCallback = callback; return this; };
Import.prototype.fail = function(callback) { this.failCallback = callback; return this; };
Import.prototype.always = function(callback) { this.alwaysCallback = callback; return this; };
Import.prototype.setHeaders = function(headers) {
	this.info.headers = headers;
	for(var name in this.info.headers) { this.xhr && this.xhr.setRequestHeader(name, this.info.headers[name]); }
	return this;
};
Import.prototype.send = function() {
	var self = this;
	if(window.ActiveXObject) { 
		this.xhr = new ActiveXObject('Microsoft.XMLHTTP'); 
	} else if(window.XMLHttpRequest) { 
		this.xhr = new XMLHttpRequest();
	}
	if(!this.xhr) throw "xhr can't initiate.";

	this.xhr.onreadystatechange = function() {
		if(self.xhr.readyState == 4 && self.xhr.status == 200) {
			var result = self.xhr.responseText;
			if(self.info.json === true && typeof JSON != 'undefined') {
				result = JSON.parse(result);
			}
			self.doneCallback && self.doneCallback.apply(self.host, [result, self.info]);
		} else if(self.xhr.readyState == 4 && self.xhr.status == 0) {
			self.failCallback && self.failCallback.apply(self.host, [self.info]);
		} else {
			//console.log(self.xhr.readyState + ":" + self.xhr.status);
		}
		self.alwaysCallback && self.alwaysCallback.apply(self.host, [self.info]);
	}
	this._send = function() {
		var debug = false;
		if(debug) console.log("IMPORT",this.info.method,this.info.url + this.info.formatQuery(),this.info.type);
		this.xhr.open(this.info.method, this.info.url + this.info.formatQuery(), true);
		this.setHeaders({
			'X-Requested-With': 'XMLHttpRequest'
		});
		if(this.info.headers && typeof this.info.headers == 'object') {
			for(var name in this.info.headers) this.xhr && this.xhr.setRequestHeader(name, this.info.headers[name]);
		}
		var data = this.info.formatBody();
		if(debug) console.log("BODY",data);
		if(data !="") {
			this.setHeaders({
				'Content-type' : this.info.type
			});
			self.xhr.send(data);
		} else {
			self.xhr.send();	
		}
	}
	this._send(); 
	return this;
};
Import.Codec = {};
Import.Codec.Hex = function(str) {
	var dict = {
		"0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "A" : 10, "a" : 10, "B" : 11, "b" : 11, "C" : 12, "c" : 12, "D" : 13, "d" : 13, "E" : 14, "e" : 14, "F" : 15, "f" : 15 
	};
	var sb = [];
	for(var x = 0; x < data.length;x+=2) {
		var a = data.charAt(x);
		var b = data.charAt(x+1);
		if(a in dict) {
			a = dict[a];
		} else {
			throw "not hex";
		}
		if(b in dict) {
			b = dict[b];
		} else {
			throw "not hex";
		}
		var c = (a << 4) + b;
		sb.push( String.fromCharCode(c) );
		
	}
	return sb.join("");
}
Import.Codec.Hex2NumArray = function(data) {
	var dict = {
		"0" : 0, "1" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "A" : 10, "a" : 10, "B" : 11, "b" : 11, "C" : 12, "c" : 12, "D" : 13, "d" : 13, "E" : 14, "e" : 14, "F" : 15, "f" : 15 
	};
	var sb = [];
	for(var x = 0; x < data.length;x+=2) {
		var a = data.charAt(x);
		var b = data.charAt(x+1);
		if(a in dict) {
			a = dict[a];
		} else {
			throw "not hex";
		}
		if(b in dict) {
			b = dict[b];
		} else {
			throw "not hex";
		}
		var c = (a << 4) + b;
		sb.push( c );
	}
	return sb;
};

Import.Codec.Base64 = function(str) {
	return window.atob(str);
}
function Export() {}
Export.Codec = {};
Export.Codec.Hex = function(str) {
	var dict = { 0 : "0", 1 : "1", 2 : "2", 3 : "3", 4 : "4", 5 : "5", 6 : "6", 7 : "7", 8: "8", 9 : "9", 10 : "A", 11 : "B", 12 : "C" , 13 : "D", 14 : "E", 15 : "F" };
	var sb = [];
	for(var x = 0; x < str.length;x++) {
		var code = str.charCodeAt(x);
		sb.push( dict[ (0xF0 & code) >> 4 ] + dict[ 0xF & code ]  );
	}
	return sb.join("");
}
Export.Codec.Base64 = function(str) {
	return window.btoa(str);
}




function isFullscreen() {
	return (window.fullScreen) ||(window.innerWidth == screen.width && window.innerHeight == screen.height)
}

var base = {};

function genId(schema,size) {
	if(!schema) {
		schema = "";
	}
	var code = 'xxxxxxxxxxxxxxxx';
	if(size) {
		var sb = [];
		for(var x = 0; x < size;x++) {
			sb.push("x");
		}
		code = sb.join("");
	}
	return function() {
		return schema+(code).replace(/[x]/g, function(c) {
			var r = Math.random() * 16 | 0;
			if( c == 'x' ) {
				return r.toString(16);
			} else {
				return c;
			}
		})
	};
}


var Binary = {};

Binary.ab162str = function(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
Binary.str2ab16 = function(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


Binary.ab322str = function(buf) {
    return String.fromCharCode.apply(null, new Uint32Array(buf));
}
Binary.str2ab32 = function(str) {
    var buf = new ArrayBuffer(str.length*4); // 2 bytes for each char
    var bufView = new Uint32Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.codePointAt(i);
    }
    return buf;
}
Binary.str2utf8ab = function(str) {
    var list = [];
    for(let c of str) {
        var code = c.codePointAt(0);
        if(code >= 0 && code <= 0x7f) {
            list.push(code);
        } else if(code >= 0x80 && code <= 0x7ff) {
            list.push( 0xC0 | ( (0x7C0 & code) >>6 ));
            list.push( 0x80 | (0x3F & code) );
        } else if(code >= 0x800 && code <= 0xFFFF) {
            list.push( 0xE0 | ( (0xF000 & code) >> 12 ));
            list.push( 0x80 | ( (0x0FC0 & code) >> 6 ));
            list.push( 0x80 | (0x3F & code) );
        } else if(code >= 0x10000 && code <= 0x1fffff) {
            list.push( 0xF0 | ((0x1C0000 & code) >> 18));
            list.push( 0x80 | ((0x03F000 & code) >> 12 ));
            list.push( 0x80 | ((0x000FC0 & code) >> 6 ));
            list.push( 0x80 | ((0x00003F & code) ));
        } else {
            throw new Error("string is not a utf8, bug on charCodeAt.");
        }
    }
    var buf = new ArrayBuffer(list.length);
    var bufView = new Uint8Array(buf);
    for(var x = 0; x < list.length;x++)
        bufView[x] = list[x];
    return buf;
}
Binary.str2bytes = function(str) {
    var list = [];
    for(let c of str) {
        var code = c.codePointAt(0);
        if(code >= 0 && code <= 0x7f) {
            list.push(code);
        } else if(code >= 0x80 && code <= 0x7ff) {
            list.push( 0xC0 | ( (0x7C0 & code) >>6 ));
            list.push( 0x80 | (0x3F & code) );
        } else if(code >= 0x800 && code <= 0xFFFF) {
            list.push( 0xE0 | ( (0xF000 & code) >> 12 ));
            list.push( 0x80 | ( (0x0FC0 & code) >> 6 ));
            list.push( 0x80 | (0x3F & code) );
        } else if(code >= 0x10000 && code <= 0x1fffff) {
            list.push( 0xF0 | ((0x1C0000 & code) >> 18));
            list.push( 0x80 | ((0x03F000 & code) >> 12 ));
            list.push( 0x80 | ((0x000FC0 & code) >> 6 ));
            list.push( 0x80 | ((0x00003F & code) ));
        } else {
            throw new Error("string is not a utf8, bug on charCodeAt.");
        }
	}
	return list;
}
Binary.utf8ab2str = function(ab,size) {
    var u8a = new Uint8Array(ab,0,size);
    var p = 0;
    var str = [];
    while(p < size) {
        if( (u8a[p] & 0x80) == 0x80 ) {
            // 2, 3 or 4 bytes
            if( (u8a[p] & 0xE0) == 0xE0 ) {
                if( (u8a[p] & 0xF0) == 0xF0 ) { // 4 bytes
                    if(p+3 < size) {
                        str.push( String.fromCodePoint( ( ( u8a[p] & 0x7 ) << 18 ) | ( ( u8a[p+1] & 0x3F ) << 12 ) | ( ( u8a[p+2] & 0x3F ) << 6 ) | ( ( u8a[p+3] & 0x3F ) ) ) );
                        p+=4;
                    } else {
                        throw new Error("bad utf8 (3):" + p);
                    }
                } else if(p+2<size) { // 3 bytes
                    str.push( String.fromCodePoint( ( u8a[p+2] & 0x3F ) | ( ( u8a[p+1] & 0x3F ) << 6 ) | (( u8a[p] & 0x0F ) << 12 ) ) );
                    p+=3;
                } else {
                    throw new Error("bad utf8 (2):"+p);    
                }
            } else if(p+1 < size) { // 2 bytes
                str.push(String.fromCodePoint( (u8a[p+1] & 0x3F) | ( (u8a[p] & 0x1F) << 6) ));
                p+=2;
            } else {
                throw new Error("bad utf8 (1):"+p);
            }
        } else { // 1 byte
            str.push(String.fromCodePoint(0x7F & u8a[p]));
            p++;
        }
    }
    return str.join("");
}
function BinaryWriter() {
    this.data = [];
}

BinaryWriter.prototype.u8 = function(val) {
    if(Type.value(val) != "[object Number]") throw new Error("BinaryWriter.u8 : val must be a number");
    if(val<0 && val > 255) throw new Error("BinaryWriter.i8 : val is out of bounds.");
    var arr = new Uint8Array(1);
    arr[0] = val;
    this.data.push(arr);
    return this;
}
BinaryWriter.prototype.u16 = function(val) {
    if(Type.value(val) != "[object Number]") throw new Error("BinaryWriter.u16 : val must be a number");
    if(val<0 && val > 65535) throw new Error("BinaryWriter.i16 : val is out of bounds.");
    var arr = new Uint16Array(1);
    arr[0] = val;
    this.data.push(arr);
    return this;
}
BinaryWriter.prototype.u32 = function(val) {
    if(Type.value(val) != "[object Number]") throw new Error("BinaryWriter.u32 : val must be a number");
    if(val<0 && val > 4294967295) throw new Error("BinaryWriter.u32 : val is out of bounds.");
    var arr = new Uint32Array(1);
    arr[0] = val;
    this.data.push(arr);
    return this;
}
BinaryWriter.prototype.add = function(array_buffer) {
    if(Type.value(array_buffer) != "[object ArrayBuffer]") throw new Error("BinaryWriter.add : val must be ArrayBuffer");
    this.data.push(array_buffer);
    return this;
}
BinaryWriter.prototype.toBlob = function(){
    return new Blob(this.data);
}

function BinaryReader(blob,array_buffer) {
    this.blob = blob;
    var self = this;
    this.pos = 0;
    this.data = array_buffer;
}
BinaryReader.prototype.u8 = function() {
    var dv = new DataView(this.data,this.pos,1);
    this.pos += 1;
    return dv.getUint8(0,true);
}
BinaryReader.prototype.u16 = function() {
    var dv = new DataView(this.data,this.pos,2);
    this.pos += 2;
    return dv.getUint16(0,true);
}
BinaryReader.prototype.u32 = function() {
    var dv = new DataView(this.data,this.pos,4);
    this.pos += 4;
    return dv.getUint32(0,true);
}
BinaryReader.prototype.toBlob = function(size) {
    var p = this.pos;
    this.pos += size;
    return this.blob.slice(p, p+size);
}
BinaryReader.prototype.seek = function(rel) {
    this.pos += rel;
}


var util = {};
util.extend = function (target, ext) {
	for (var prop in ext) {
		var copy = ext[prop];
		var t = Object.prototype.toString.apply(copy);
		if (t == "[object Object]") {
			target[prop] = util.extend({}, copy);
		} else if (t == "[object Array]") {
			target[prop] = util.extend([], copy);
		} else {
			target[prop] = copy;
		}
	}
	return target;
}
util.extend0 = function (target, ext) {
	for (var prop in ext) {
		target[prop] = ext[prop];
	}
	return target;
}
util.copy = function (target) {
	var t = Object.prototype.toString.apply(target);
	if (t == "[object Object]") {
		var r = {};
		util.extend(r, target);
		return r;
	} else if (t == "[object Array]") {
		var r = [];
		util.extend(r, copy);
		return r;
	} else {
		return target;
	}
}

function TypeInstance() {
	this.name = ""; this.raw = ""; this.primitive = false;
	this.object = false; this.dom = false; this.reference = false;
}
Type = (function () {
	var ar = [
		"Boolean]", 
		"String]", 
		"Number]", 
		"Array]", 
		"Object]", 
		"RegExp]", 
		"Date]", 
		"Function]", 
		"Error]", 
		"Event]", 
		"MouseEvent]", 
		"KeyboardEvent]", 
		"global]",
		"AsyncFunction]", // 13
		"Promise]" // 14
	], f = Object.prototype.toString, s = "[object ";
	Type = function () {
		if (arguments.length == 0) throw "must pass something";
		var ret = new TypeInstance(), a = arguments[0];
		if (a == undefined || a == null) { ret.name = "undefined"; ret.primitive = true; return ret; }
		var str = f.call(a);
		ret.raw = str;
		if (a != undefined && a != null && typeof (a) == typeof ({}) && "tagName" in a) {
			var tag = a.tagName.toString().toLowerCase();
			ret.object = true; ret.dom = true; ret.name = "html_" + tag;
			return ret;
		} else for (var x = 0; x < ar.length; x++) {
			if (str == (s + ar[x])) {
				var n = ar[x].substring(0, ar[x].length - 1);
				ret[n] = true; ret.name = n; ret.primitive = true;
				return ret;
			}
		}
		console.log("Unkown Type:" + str);
		return ret;
	};
	var t = Type, f0 = function (g) { return function (val) { return f.apply(val) == (s + g); } };
	t.isBoolean = f0(ar[0]); t.isString = f0(ar[1]);
	t.isNumber = f0(ar[2]); t.isArray = f0(ar[3]);
	t.isObject = f0(ar[4]); t.isRegExp = f0(ar[5]);
	t.isDate = f0(ar[6]); t.isFunction = f0(ar[7]);
	t.isError = f0(ar[8]);
	t.isAsync = f0(ar[13]);
	t.isPromise = f0(ar[14]);
	t.newOf = function(type,meta) {
		var obj = {};
		obj[Symbol.toStringTag] = type;
		return obj;
	}
	t.check = function(obj,type) {
		return f.apply(obj) == "[object " + type + "]"
	}
	t.value = function(obj) {
		return f.apply(obj);
	}
	return t;
})();

var BrowserTools = {};

BrowserTools.setStyle = function (target, opt, inner) {
	if ("dispose" in opt) {

		if ("events" in opt) for (var key in opt.events) {
			if (Object.prototype.toString.apply(opt.events[key]) == "[object Array]") {
				for (var x = 0; x < opt.events[key].length; x++) {
					target.removeEventListener(key, opt.events[key][x]);
				}
			} else {
				target.removeEventListener(key, opt.events[key]);
			}
		}
		console.log("disposing.");

	} else {
		if ("class" in opt) {
			if ("add" in opt.class) {
				var t = Object.prototype.toString.apply(opt.class.add);
				if (t == "[object Array]") {
					for (var x = 0; x < opt.class.add.length; x++) {
						target.classList.add(opt.class.add[x]);
					}
				} else {
					target.classList.add(opt.class.add);
				}
			}
			if ("remove" in opt.class) {
				var t = Object.prototype.toString.apply(opt.class.remove);
				if (t == "[object Array]") {
					for (var x = 0; x < opt.class.remove.length; x++) {
						target.classList.remove(opt.class.remove[x]);
					}
				} else {
					target.classList.remove(opt.class.remove);
				}
			}
		}
		if ("style" in opt) {
			for (var key in opt.style) { target.style[key] = opt.style[key]; }
		}
		if ("events" in opt) for (var key in opt.events) {
			if (Object.prototype.toString.apply(opt.events[key]) == "[object Array]") {
				if (opt.events[key].length > 1 && Object.prototype.toString.apply(opt.events[key][1]) == "[object Boolean]") {
					for (var x = 0; x < opt.events[key].length; x += 2) {
						target.addEventListener(key, opt.events[key][x], opt.events[key][x + 1]);
					}
				} else {
					if (Object.prototype.toString.apply(opt.events[key][opt.events[key].length - 1]) == "[object Boolean]") {
						for (var x = 0; x < opt.events[key].length; x++) {
							target.addEventListener(key, opt.events[key][x], opt.events[key][opt.events[key].length - 1]);
						}
					} else { // default
						for (var x = 0; x < opt.events[key].length; x++) {
							target.addEventListener(key, opt.events[key][x]);
						}
					}
				}
			} else {
				target.addEventListener(key, opt.events[key]);
			}
		}
		if ("attribs" in opt) for (var key in opt.attribs) target.setAttribute(key, "" + opt.attribs[key]);
		if ("props" in opt) {
			for (var key in opt.props) {
				target[key] = opt.props[key];
			}
		}
	}
}

BrowserTools.arraySetStyle = function (target, opt) {
	for (var key in opt) if (key != "events" && key != "attribs" && key != "value") for (var x = 0; x < target.length; x++) target[x].style[key] = opt[key];
	if (inner) for (var x = 0; x < target.length; x++) target[x].innerHTML = inner;
	if ("events" in opt) for (var key in opt.events) for (var x = 0; x < target.length; x++) target[x].addEventListener(key, opt.events[key]);
	if ("attribs" in opt) for (var key in opt.attribs) for (var x = 0; x < target.length; x++) target[x].setAttribute(key, "" + opt.attribs[key]);
	if ("value" in opt) for (var x = 0; x < target.length; x++) target[x].value = opt.value;
}

BrowserTools.inoutStyle = function (a, b) {
	var self = this;
	this.addEventListener("mouseover", function () { for (var key in a) self.style[key] = a[key]; });
	this.addEventListener("mouseout", function () { for (var key in b) self.style[key] = b[key]; });
}
BrowserTools.inIframe = function () {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
}
BrowserTools.decodeEntities = (function () {
	// this prevents any overhead from creating the object each time
	var element = document.createElement('div');

	function decodeHTMLEntities(str) {
		if (str && typeof str === 'string') {
			var sb = [];
			for(var x = 0; x < str.length;x++) { // partial value like in PRE contents.
				if(str.charAt(x) == ">") {
					sb.push("&");
					sb.push("#");
					sb.push("6");
					sb.push("2");
					sb.push(";");
				} else if(str.charAt(x) == "<") {
					sb.push("&");
					sb.push("#");
					sb.push("6");
					sb.push("0");
					sb.push(";");
				} else {
					sb.push(str.charAt(x));
				}
			}
			str = sb.join("");
			// strip script/html tags
			//str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
			//str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
			element.innerHTML = str;
			str = element.textContent;
			element.textContent = '';
		}

		return str;
	}

	return decodeHTMLEntities;
})();



function CSS(selector, style) {
	if (!document.styleSheets) return;
	if (document.getElementsByTagName('head').length == 0) return;
	var styleSheet, mediaType;
	if (document.styleSheets.length > 0) {
		for (var i = 0, l = document.styleSheets.length; i < l; i++) {
			if (document.styleSheets[i].disabled)
				continue;
			var media = document.styleSheets[i].media;
			mediaType = typeof media;
			if (mediaType === 'string') {
				if (media === '' || (media.indexOf('screen') !== -1)) {
					styleSheet = document.styleSheets[i];
				}
			} else if (mediaType == 'object') {
				if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
					styleSheet = document.styleSheets[i];
				}
			}
			if (typeof styleSheet !== 'undefined')
				break;
		}
	}
	if (typeof styleSheet === 'undefined') {
		var styleSheetElement = document.createElement('style');
		styleSheetElement.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(styleSheetElement);
		for (i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].disabled) {
				continue;
			}
			styleSheet = document.styleSheets[i];
		}
		mediaType = typeof styleSheet.media;
	}
	if (mediaType === 'string') {
		for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
			if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
				styleSheet.rules[i].style.cssText = style;
				return;
			}
		}
		styleSheet.addRule(selector, style);
	} else if (mediaType === 'object') {
		var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
		for (var i = 0; i < styleSheetLength; i++) {
			if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
				styleSheet.cssRules[i].style.cssText = style;
				return;
			}
		}
		styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
	}
}

var JSONTools = {};
JSONTools.pretty_stringfy = function (json) {
	var debug = false;
	var cache = {};
	function tabs(n) {
		if (n in cache) return cache[n];
		cache[0] = "";
		cache[1] = "\t";
		for (var x = 2; x <= n; x++) cache[x] = cache[x - 1] + "\t";
		return cache[n];
	}
	function str_format(str) {
		var ret = [];
		for (var x = 0; x < str.length; x++) {
			if (str.charAt(x) == 9) {
				ret.push("\\t");
			} else if (str.charAt(x) == 10) {
				ret.push("\\n");
			} else if (str.charAt(x) == 13) {
				ret.push("\\r")
			} else {
				ret.push(str.charAt(x));
			}
		}
		return "\"" + ret.join("") + "\"";
	}
	function json_obj(builder, target, level) {
		if (level == 0) builder.push(tabs(level) + "{");
		var keys = [];
		for (var key in target) {

			keys.push(key);
		}
		keys.sort();
		for (var x = 0; x < keys.length; x++) {
			var key = keys[x];
			var val = target[key];
			var type = Object.prototype.toString.apply(val);
			var comma = (x > 0) ? "," : " ";
			if (type == "[object String]") {
				builder.push(tabs(level + 1) + comma + "\"" + key + "\" : " + str_format(val));
			} else if (type == "[object Number]") {
				builder.push(tabs(level + 1) + comma + "\"" + key + "\" : " + val);
			} else if (type == "[object Array]") {
				builder.push(tabs(level + 1) + comma + "\"" + key + "\" : [");
				json_arr(builder, val, level + 1);
			} else if (type == "[object Object]") {
				builder.push(tabs(level + 1) + comma + "\"" + key + "\" : {");
				json_obj(builder, val, level + 1);
			} else {
				throw "not implemented."
			}
		}
		if (level == 0) builder.push(tabs(level) + "}");
		else builder.push(tabs(level) + "}");
	}
	function json_arr(builder, target, level) {

		if (level == 0) builder.push(tabs(level) + "[");
		var keys = [];
		for (var key in target) keys.push(key);
		keys.sort();
		for (var x = 0; x < keys.length; x++) {
			var key = keys[x];
			var val = target[key];
			var type = Object.prototype.toString.apply(val);
			var comma = (x > 0) ? "," : " ";
			if (type == "[object String]") {
				builder.push(tabs(level + 1) + comma + str_format(val));
			} else if (type == "[object Number]") {
				builder.push(tabs(level + 1) + comma + val);
			} else if (type == "[object Array]") {
				builder.push(tabs(level + 1) + comma + "[");
				json_arr(builder, val, level + 1);
			} else if (type == "[object Object]") {
				builder.push(tabs(level + 1) + comma + "{");
				json_obj(builder, val, level + 1);
			} else {
				throw "not implemented."
			}
		}
		if (level == 0) builder.push(tabs(level) + "]");
		else builder.push(tabs(level) + "]");
	}
	var build = [];
	json_obj(build, json, 0);
	return build.join("\r\n");
}


if (false && "localStorage" in window) {
	// front-end developer level protect against unawareness
	var save = window.localStorage.setItem;
	var load = window.localStorage.getItem;
	// reserved keys
	var reserved = ["index"];

	Object.defineProperty(window.localStorage, "setItem", {
		configurable: false,
		get: function () {
			return function (key, value) {
				if (reserved.indexOf(key) > -1) {
					throw "use setReservedItem, be carefull.";
				} else {
					return save.apply(window.localStorage, [key, value]);
				}
			}
		}
	});
	Object.defineProperty(window.localStorage, "setReservedItem", {
		configurable: false,
		get: function () {
			return function (key, value) {
				if (reserved.indexOf(key) > -1) {
					return save.apply(window.localStorage, [key, value]);
				} else {
					throw "use setItem";
				}
			}
		}
	});
	Object.defineProperty(window.localStorage, "getItem", {
		configurable: false,
		get: function () {
			return function (key) {
				if (reserved.indexOf(key) > -1) {
					throw "use getReservedItem, be careful.";
				} else {
					return load.apply(window.localStorage, [key]);
				}
			};
		}
	});
	Object.defineProperty(window.localStorage, "getReservedItem", {
		configurable: false,
		get: function () {
			return function (key) {
				if (reserved.indexOf(key) > -1) {
					return load.apply(window.localStorage, [key]);
				} else {
					throw "use setItem";
				}
			};
		}
	});

}



ClassDefinition = function (full_name, constructor, destructor) {
	Object.defineProperty(this, "fullName", { value: full_name, writeable: false, configurable: false, enumberable: true });

	var _ctor = function () { };
	Object.defineProperty(this, "constructor", { value: _ctor, writeable: false, configurable: false, enumberable: true });

	var _dtor = function () { };
	Object.defineProperty(this, "destructor", { value: _ctor, writeable: false, configurable: false, enumberable: true });


	var _load = [constructor];
	Object.defineProperty(this, "load", { value: _load, writeable: false, configurable: false, enumerable: true });

	var _unload = [destructor];
	Object.defineProperty(this, "unload", { value: _unload, writeable: false, configurable: false, enumerable: true });

	var _inherits = [];
	Object.defineProperty(this, "inherits", { value: _inherits, writeable: false, configurable: false, enumberable: true });

	var _share = [];
	Object.defineProperty(this, "share", { value: _share, writeable: false, configurable: false, enumberable: true });

	var _sealed = { data: false };
	Object.defineProperty(this, "sealed", {
		get: function () { return _sealed.data; },
		set: function (value) { if (value === true || value === false) _sealed.data = value; },
		writeable: true,
		configurable: false,
		enumberable: true
	});

	var _childClasses = {};
	Object.defineProperty(this, "childClasses", { value: _childClasses, writeable: false, configurable: false, enumberable: true });

	var _behaves = [];
	Object.defineProperty(this, "behaves", { value: _behaves, writeable: false, configurable: false, enumberable: true });
	var _properties = [];

	Object.defineProperty(this, "properties", { value: _properties, writable: false, configurable: false, enumerable: true });

	var _revision = 1;
	Object.defineProperty(this, "revision", { value: _revision, writeable: true, configurable: false, enumerable: true });

	var _structpointer = {
		data: 0
	};
	Object.defineProperty(this, "struct", { value: _structpointer, writeable: false, configurable: false, enumerable: true });

};
Class = function () {
	(function (self) {
		var data = {};
		Object.defineProperty(self, "data", {
			get: function () { return data; },
			writeable: false,
			configurable: false
		});

	})(this);

};
Class.prototype.define = function (name, options) {
	// deprecated (name,inherits,constructor,predef)
	console.log("Class define", name);

	var meta = null
		, constructor = null
		, destructor = null
		, predef = null;

	if (arguments.length == 1) {
		// (name)
		name = arguments[0];
	} else if (arguments.length == 2) {
		// (name,prototype (aka predef) )
		name = arguments[0];
		options = arguments[1];
		//console.log("opening works");
		// throw "Class.define does not have a '5 arguments or more' constructor.";
	}

	options = options || {};


	if ("ctor" in options) {
		constructor = options.ctor;
	}
	if ("dtor" in options) {
		destructor = options.dtor;
	}
	if ("from" in options) {
		meta = options.from;

	}

	if ("proto" in options) {
		predef = options.proto;
	}


	if (!Type.isString(name)) throw "Class.define name must be a string.";



	if (meta != null && !Type.isObject(meta) && !Type.isArray(meta)) throw "Class.define meta must be an object or an array.";
	if (meta == null) meta = [];
	if (constructor != null && !Type.isFunction(constructor)) throw "Class.define constructor must be an function.";
	if (constructor == null) constructor = function () { };
	if (destructor != null && !Type.isFunction(destructor)) throw "Class.define destructor must be an function.";
	if (destructor == null) destructor = function () { };

	if (predef != null && !Type.isObject(predef)) throw "Class.define prototype must be an object.";
	if (predef == null) predef = {};

	var behaves = [];
	if ("from" in options && Type.isArray(options.from)) {
		behaves = options.from;
	}

	var pathName = name.split(".");
	var target = this.data; // childClasses
	var last_name = null;

	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (cur.length > 256) {
			throw "Class.define name '" + cur + "' too long in '" + name + "'.";
		}
		last_name = cur;
		if (pathName.length == 0) break;
		if (!(cur in target)) {
			throw "Class.define '" + name + "' has a invalid path name at '" + cur + "'.";
		}
		target = target[cur].childClasses;
	}

	if (last_name in target) console.log("warning: '" + name + "' redefined.", "color:#ff0000");

	var cd = target[last_name] = new ClassDefinition(name, constructor, destructor);

	if (Type.isObject(options)) {
		if ("struct" in options) {
			cd.struct.data = options.struct;
		}
	}

	for (var x = 0; x < behaves.length; x++) {
		//console.log(name);
		Class.behaveLike(name, behaves[x]);
	}

	var self_class = this;
	var ret = function () { };

	ret.prototype.fullName = name;
	ret.prototype.set = function (key, value) {
		var type = Type(key);
		if (type.name == "String") {
			var proto = cd.constructor.prototype;
			proto[key] = value;
			return this;
		} else if (type.name == "Object") {
			var proto = cd.constructor.prototype;
			for (var k in key) {
				if (Type.isObject(key[k])) {
					var check = false;
					var count = 0;
					var format = false;
					for (var k1 in key[k]) {
						if (Object.prototype.hasOwnProperty.apply(key[k], [k1])) {
							check = true;
							if (k1 == "initProperty" && Type.isFunction(key[k][k1])) {
								format = true;
							}
							count++;
						}
					}
					format = format && (count == 1);
					if (!check) {
						cd.properties.push([k, key[k], 0]);
					} else if (format) {
						cd.properties.push([k, key[k], 1]);
					} else {
						proto[k] = Object.create(key[k]); // make a copy
					}
				} else {
					proto[k] = key[k];
				}
			}
		}
	};
	ret.prototype.create = function (opt) {
		return Class.create.apply(Class, [name, opt]);
	};
	ret = new ret;
	if (predef != undefined && predef != null && Object.prototype.toString.apply(predef) == "[object Object]") {
		ret.set(predef);
	}
	return ret;
};

Class.prototype.getDefinition = function (name) {
	var pathName = name.split(".");
	var target = this.data;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (cur.length > 512) throw "Class.getDefinition name too long.";
		if (pathName.length == 0) {
			if (cur in target) {
				// make a secure copy, translate pointers to names
				target = target[cur];
				console.log("Class.getDefinition is for debug purposes.");
				return target;
			}
			break;
		}
		target = target[cur].childClasses;
	}
	return null;
};

Class.prototype.getPrototypeOf = function (name) {
	var pathName = name.split(".");
	var target = this.data;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (cur.length > 256) throw "Class.getDefinition name too long.";
		if (pathName.length == 0) {
			if (cur in target) {
				target = target[cur];
				if (!target.sealed) return target.constructor.prototype;
				throw "Class.getPrototypeOf '" + name + "' is a sealed class.";
			}
			break;
		}
		target = target[cur].childClasses;
	}
	throw "Class.getPrototypeOf '" + name + "' does not exists.";
};

Class.prototype.behaveLike = function (destiny, source) {
	if (destiny == source) return;
	//console.log("behaveLike",destiny,source);

	var source_name = source;
	var destiny_name = destiny;

	var pathName = destiny.split(".");
	var target = this.data;
	var check = false;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (pathName.length == 0) {
			if (cur in target) {
				check = true;
				target = target[cur];

			}
			break;
		}
		target = target[cur].childClasses;
	}
	if (!check) {
		throw "Class.extend where destiny '" + destiny + "' was not found.";
	}
	destiny = target;
	if (destiny.sealed) {
		throw "Class.extend where destiny '" + destiny + "' is sealed.";
	}

	pathName = source.split(".");
	target = this.data;
	check = false;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		//console.log(" _ : ", cur);
		if (pathName.length == 0) {
			if (cur in target) {
				check = true;
				target = target[cur];
			}
			break;
		}
		target = target[cur].childClasses;
	}
	if (!check) {
		throw "Class.extend where source '" + destiny + "' was not found.";
	}
	source = target;

	for (var x = 0; x < destiny.behaves.length; x++) {
		if (destiny.behaves[x] == source) {
			return;
		}

	}
	// just a mark to not insert twice
	destiny.behaves.push(source);

	for (var x = 0; x < source.behaves.length; x++) {
		//console.log(">>",destiny_name,source.behaves[x].fullName)
		Class.behaveLike(destiny_name, source.behaves[x].fullName);
	}

	// reorder behaviours cause its need to instanciate correct order and correct unordered marks
	// check dependency
	var count = 0;
	while (true) {
		var check = false;
		for (var x = destiny.behaves.length - 1; x >= 0; x--) {
			for (var y = x - 1; y >= 0; y--) {
				// find x in y, if found change place
				var itemA = destiny.behaves[x];
				var itemB = destiny.behaves[y];
				var used = [];
				var stack = [itemB];
				while (stack.length > 0) {
					var b = stack.pop();
					used.push(b);
					for (var z = 0; z < b.behaves.length; z++) {
						if (b.behaves[z] == itemA) {
							// found
							check = true;
							break;
						} else {
							var check2 = false;
							for (var w = 0; w < used.length; w++) {
								if (used[w] == b.behaves[z]) {
									check2 = true;
									break;
								}
							}
							if (!check2) stack.push(b.behaves[z]);
						}
					}
					if (check) break;

				}
				if (check) {
					// swap
					count++;
					if (count > (destiny.behaves.length * destiny.behaves.length + 1)) {
						throw "Class.define can not resolve references, bad project, past depends on future so async must be a queue with check over time or something better.";
					}
					destiny.behaves[y] = itemA;
					destiny.behaves[x] = itemB;
					break;
				}
			}
			if (check) {
				break;
			}
		}
		if (!check) break;
	}

	for (var k in source.constructor.prototype) {
		destiny.constructor.prototype[k] = source.constructor.prototype[k];
	}


	destiny.revision += 1;

	return destiny;

};

Class.prototype.create = function (c, opt, mode) {
	mode = mode || { debug: true };
	//if(mode && "debug" in mode) console.log("Class create",c);

	if (
		!(
			Type.isString(c) &&
			(opt == null || opt == undefined || Type.isObject(opt))
		)
	) {
		throw "Class.create bad arguments.";
	}

	var pathName = c.split(".");
	var target = this.data;
	var check = false;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (pathName.length == 0) {
			if (cur in target) {
				check = true;
				target = target[cur];
			}
			break;
		}
		if (cur in target && "childClasses" in target[cur]) {
			target = target[cur].childClasses;
		} else {

			throw "Class '" + c + "' is not defined.";
		}
	}
	if (!check) {
		throw "Class.create '" + c + "' was not found.";
	}

	c = target;
	//console.log(c);
	opt = opt || {};

	var ret_instance = null;
	var new_obj = function () { return {}; }
	var obj_def = function () {

		var _internal = new_obj();
		Object.defineProperty(this, "internal", {
			get: function () { return _internal; }
		});

		var _type = c.fullName;
		Object.defineProperty(_internal, "type", {
			get: function () { return _type; }
		});


		var _data = null;

		if (c.struct.data != 0) {
			_data = new c.struct.data;
		} else {
			_data = {};
		}

		Object.defineProperty(_internal, c.fullName, {
			get: function () { return _data; }
		});

		var _rev = c.revision;
		Object.defineProperty(_data, "revision", {
			get: function () { return _rev; }
		});


		for (var x = 0; x < c.behaves.length; x++) {
			(function (x, c, opt, self) {
				//console.log(">> Class.create [behaves] ", c.fullName, c.behaves[x].fullName);

				if (c.behaves[x].fullName in opt) {
					if (Type.isArray(opt[c.behaves[x].fullName])) {
						bargs = opt[c.behaves[x].fullName];
					} else {
						throw "Class.create arguments of type '" + c.behaves[x].fullName + "' must be in array format";
					}
					bargs = opt[c.behaves[x].fullName];
				} else {
					bargs = [];
				}

				var _inline = new new_obj;
				if (c.behaves[x].struct.data != 0) {
					_inline = new c.behaves[x].struct.data;
				}

				Object.defineProperty(_internal, c.behaves[x].fullName, {
					get: function () { return _inline; }
				});

				var _cur_rev = c.behaves[x].revision;
				Object.defineProperty(_inline, "revision", {
					get: function () { return _cur_rev; }
				});

				for (var y = 0; y < c.behaves[x].load.length; y++) {
					c.behaves[x].load[y].apply(self, bargs);
				}


			})(x, c, opt, this);
		}


		var aargs = [];
		if (c.fullName in opt) {
			if (Type.isArray(opt[c.fullName])) {
				aargs = opt[c.fullName];
			} else {
				throw "Class.create arguments of type '" + c.fullName + "' must be in array format";
			}
		}
		for (var x = 0; x < c.load.length; x++) {
			c.load[x].apply(this, aargs);
		}

	};
	obj_def.prototype = Object.create(c.constructor.prototype);
	obj_def.prototype[Symbol.toStringTag] = c.fullName;
	ret_instance = new obj_def();

	for (var x = 0; x < c.properties.length; x++) {

		var prop_name = c.properties[x][0];
		var prop_desc = c.properties[x][1];
		var prop_type = c.properties[x][2];
		if (prop_type == 0) {

			Object.defineProperty(
				ret_instance,
				prop_name,
				{ get: function () { return proc_desc; } }
			);

		} else if (prop_type == 1) {
			Object.defineProperty(
				ret_instance,
				prop_name,
				prop_desc.initProperty()
			);
		}

	}

	return ret_instance;

};

Class.prototype.finish = function (instance, opt) {
	var name = instance.internal.type;
	var pathName = name.split(".");
	var target = this.data;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (cur.length > 256) throw "Class.finish name too long.";
		if (pathName.length == 0) {
			if (cur in target) {
				target = target[cur];
				break;
			} else {
				throw "Class.finish name not found.";
			}
		}
		target = target[cur].childClasses;
	}

	var aargs = [];
	if (name in opt) {
		if (Type.isArray(opt[name])) {
			aargs = opt[name];
		} else {
			throw "Class.create arguments of type '" + c.fullName + "' must be in array format";
		}
	}

	for (var x = target.unload.length - 1; x >= 0; x--) {
		target.load[x].apply(instance, aargs);
	}

	for (var x = target.behaves.length - 1; x >= 0; x--) {
		(function (x, c, opt, self) {
			//console.log(">> Class.create [behaves] ", c.fullName, c.behaves[x].fullName);

			if (c.behaves[x].fullName in opt) {
				if (Type.isArray(opt[c.behaves[x].fullName])) {
					bargs = opt[c.behaves[x].fullName];
				} else {
					throw "Class.create arguments of type '" + c.behaves[x].fullName + "' must be in array format";
				}
				bargs = opt[c.behaves[x].fullName];
			} else {
				bargs = [];
			}
			for (var y = c.behaves[x].unload.length; y >= 0; y--) {
				c.behaves[x].unload[y].apply(self, bargs);
			}

		})(x, target, opt, instance);
	}


};
Class.prototype.instanceCheck = function (a) {
	if ("internal" in a) {
		if ("_typeName" in a.internal) {
			var type = a.internal._typeName;

			var pathName = a.split(".");
			var inner_target = this.data;
			var check = false;
			while (pathName.length > 0) {
				var cur = pathName.shift();
				if (pathName.length == 0) {
					if (cur in inner_target) {
						check = true;
						inner_target = inner_target[cur];

					}
					break;
				}
				inner_target = inner_target[cur].childClasses;
			}
			if (!check) {
				throw "Class.instance parent '" + bname + "' was not found.";
			}
			var a_def = inner_target;

			if (a.internal._revision < a_def.revision) {
				return false;
			}
			// now check behaves

			return true;
		}
	}
	throw "not event from Class.";
};
Class.prototype.instanceOf = function (a, b) {

	// find original
	if (
		!(
			Object.prototype.toString.apply(a) == "[object Object]" &&
			Object.prototype.toString.apply(b) == "[object String]"
		)
	) {
		throw "Class.instance bad arguments.";
	}
	var bname = b;
	var pathName = b.split(".");
	var inner_target = this.data;
	var check = false;
	while (pathName.length > 0) {
		var cur = pathName.shift();
		if (pathName.length == 0) {
			if (cur in inner_target) {
				check = true;
				inner_target = inner_target[cur];

			}
			break;
		}
		inner_target = inner_target[cur].childClasses;
	}
	if (!check) {
		throw "Class.instance parent '" + bname + "' was not found.";
	}
	b = inner_target;

	if ("internal" in a) {
		if (b.fullName in a.internal) return true;
	}

	return false;

};


if (typeof module !== 'undefined' && module.exports) {
	(function (self) {
		var c = null;
		//module.exports = 
		c = new Class();
		Object.defineProperty(self, "Class", {
			get: function () {
				return c;
			}
		});
		Object.preventExtensions(c);
		Object.seal(c);

	})(global);

} else {

	(function (self) {
		var c = new Class();
		Object.defineProperty(this, "Class", {
			get: function () {
				return c;
			}
		});

		Object.preventExtensions(c);
		Object.seal(c);

	})(window);

}

Class.define("WithEvents", {
	ctor: function () {
		// default struct constructor
		var self = this;
		this.internal.WithEvents.data = {};
		this.internal.WithEvents.preCheck = function (event, callback, capture) {
			var mode = capture ? "capture" : "bubble";
			if ("on" in self.internal.WithEvents.data) {
				for (var x = 0; x < self.internal.WithEvents.data.on[mode].length; x++) {
					if (!self.internal.WithEvents.data.on[mode][x](event, callback)) {
						console.log("event blocked");
						return false;
					}
				}
			}
			if (event in self.internal.WithEvents.data) {
				for (var x = 0; x < self.internal.WithEvents.data[event][mode].length; x++) {
					if (self.internal.WithEvents.data[event][mode][x] == callback) {
						console.log("found same event pointer");
						return false;
					}
				}
			} else {
				self.internal.WithEvents.data[event] = {
					capture: [],
					bubble: []
				};
			}
			return true;
		}
		this.addEventListener = function (a, b, c) {
			return this.on(a, b, c);
		}
		this.removeEventListener = function (a, b, c) {
			return this.off(a, b, c);
		}
	}
	, proto: {
		on: function (event, callback, capture) {

			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if (!i.preCheck.apply(this, [event, callback, capture])) return false;
			i.data[event][mode].push(callback);
			return true;
		},
		once : function(event,callback,capture) {
			var self = this;
			var type = Object.prototype.toString.apply(callback);
			if(type == "[object Function]") {
				var f = function() {
					var args = [];
					for(var x = 0; x < arguments.length;x++) args.push(arguments[x]);
					var r = callback.apply(null,args);
					setTimeout(()=>{
						self.off(event,f,capture);
					},0);
					return r;
				};
				capture = capture || true;
				var mode = !!capture ? "capture" : "bubble";
				var i = this.internal["WithEvents"];
				if (!i.preCheck.apply(this, [event, f, capture])) return false;
				i.data[event][mode].push(f);
				return true;
			} else if(type == "[object AsyncFunction]") {
				var f = async function() {
					var args = [];
					for(var x = 0; x < arguments.length;x++) args.push(arguments[x]);
					var r = await callback.apply(null,args);
					setTimeout(()=>{
						self.off(event,f,capture);
					},0);
					return r;
				};
				capture = capture || true;
				var mode = !!capture ? "capture" : "bubble";
				var i = this.internal["WithEvents"];
				if (!i.preCheck.apply(this, [event, f, capture])) return false;
				i.data[event][mode].push(f);
				return true;
			} else {
				throw new Error("not implemented.");
			}
		},
		onQueue: function (event, callback, capture) {
			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if (!i.preCheck.apply(this, [event, callback, capture])) return false;
			i.data[event][mode].unshift(callback);
			return true;
		},
		onPush: function (event, callback, capture) {
			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if (!i.preCheck.apply(this, [event, callback, capture])) return false;
			if (capture) {
				i.data[event][mode].push(callback);
			} else {
				i.data[event][mode].unshift(callback);
			}
			return true;
		},
		onAfter: function (event, callback_reference, callback, capture) {
			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if (!i.preCheck.apply(this, [event, callback, capture])) return false;
			// find it
			var check = false;
			if (capture) {
				for (var x = 0; x < i.data[event][mode].length; x++) {
					if (i.data[event][mode][x] == callback_reference) {
						// insert after
						check = true;
						i.data[event][mode].splice(x + 1, 0, callback);
						break;
					}
				}
			} else {
				for (var x = i.data[event][mode].length; x >= 0; x--) {
					if (i.data[event][mode][x] == callback_reference) {
						check = true;
						i.data[event][mode].splice(x, 0, callback);
						break;
					}
				}
			}
			return check;
		},
		onBefore: function (event, callback_reference, callback, capture) {
			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if (!i.preCheck.apply(this, [event, callback])) return false;

			// find it
			var check = false;
			if (capture) {
				for (var x = 0; x < i.data[event][mode].length; x++) {
					if (i.data[event][mode][x] == callback_reference) {
						// insert after
						check = true;
						i.data[event].splice(x, 0, callback);
						break;
					}
				}
			} else {
				for (var x = i.data[event][mode].length - 1; x >= 0; x--) {
					if (i.data[event][mode][x] == callback_reference) {
						// insert after
						check = true;
						i.data[event].splice(x + 1, 0, callback);
						break;
					}
				}
			}
			return check;
		},
		off: function (event, callback, capture) {
			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if ("off" in i.data) {
				for (var x = 0; x < i.data.off[mode].length; x++) {
					if (!i.data.off[mode][x](event, callback)) {
						return false;
					}
				}
			}
			if (!(event in i.data)) {
				return true;
			}
			for (var x = 0; x < i.data[event][mode].length; x++) {
				if (i.data[event][mode][x] == callback) {
					i.data[event][mode].splice(x, 1);
					return true;
				}
			}
			return false;
		},
		clearEvents: function (event, capture) {
			capture = capture || true;
			var mode = !!capture ? "capture" : "bubble";
			var i = this.internal["WithEvents"];
			if ("off" in i.data) {
				for (var x = 0; x < i.data.off[mode].length; x++) {
					if (!i.data.off[mode][x](event, callback)) {
						return false;
					}
				}
			}
			if (!(event in i.data)) {
				return true;
			}
			i.data[event][mode].splice(0, i.data[event][mode].length);
			return true;
		},
		emit: async function (event, args) {
			//console.log("emit0",this);
			//console.log("emit",event,args);

			var i = this.internal["WithEvents"];
			//console.log(i.data);
			if (event in i.data) {
				for (var x = 0; x < i.data[event].capture.length; x++) {
					if( Object.prototype.toString.apply(i.data[event].capture[x]) == "[object AsyncFunction]" ) {
						var val = await i.data[event].capture[x].apply(this, args);
						if(val === false) return false;
					} else {
						if (!i.data[event].capture[x].apply(this, args)) {
							return false;
						}
					}
				}
			}
			// emit bottomHit
			if (("bottomHit" + event) in i.data) {
				for (var x = 0; x < i.data["bottomHit" + event].capture.length; x++) {
					if( Object.prototype.toString.apply(i.data["bottomHit" + event].capture[x]) == "[object AsyncFunction]" ) {
						var val = await i.data["bottomHit" + event].capture[x].apply(this, args);
						if(val === false) return false;
					} else {
						if (!i.data["bottomHit" + event].capture[x].apply(this, args)) {
							return false;
						}
					}
				}
				for (var x = i.data["bottomHit" + event].bubble.length - 1; x >= 0; x--) {
					if( Object.prototype.toString.apply(i.data["bottomHit" + event].capture[x]) == "[object AsyncFunction]" ) {
						var val = await i.data["bottomHit" + event].bubble[x].apply(this, args);
						if(val === false) return false;
					} else {
						if (!i.data["bottomHit" + event].bubble[x].apply(this, args)) {
							return false;
						}
					}
				}
			}
			if (event in i.data) {
				for (var x = i.data[event].bubble.length - 1; x >= 0; x--) {
					if( Object.prototype.toString.apply(i.data[event].bubble[x]) == "[object AsyncFunction]" ) {
						var val = await i.data[event].bubble[x].apply(this, args);
						if(val === false) return false;
					} else {
						if (!i.data[event].bubble[x].apply(this, args)) {
							return false;
						}
					}
				}
			}
			return true;
		}
	}
});

Class.define("WithArray", {
	ctor: function () {
		this.internal.WithArray.data = [];
	}
	, from: ["WithEvents"]
	, proto: {
		itemPush: function (item) {

			var last = this.internal.WithArray.data.length;
			if (!this.emit("itemInputFilter", [last, null, item])) return false;
			if (!this.emit("itemInputPushFilter", [last, null, item])) return false;
			this.internal.WithArray.data.push(item);
			this.emit("itemInsertPush", [last]);
			this.emit("itemInsert", [last]);
			return true;
		}
		, itemPop: function () {
			if (this.internal.WithArray.data.length > 0) {
				var last = this.internal.WithArray.data.length - 1;
				if (!this.emit("itemOutputFilter", [last, this.internal.WithArray.data[last]])) return null;
				if (!this.emit("itemOutoutPopFilter", [last, this.internal.WithArray.data[last]])) return null;
				var ret = this.internal.WithArray.data.pop();
				this.emit("itemRemovePop", [last]);
				this.emit("itemRemove", [last]);
				return ret;
			}
			return null;
		}
		, itemUnshift: function (item) {
			if (!this.emit("itemInputFilter", [0, null, item])) return false;
			if (!this.emit("itemInputUnshiftFilter", [0, null, item])) return false;
			this.internal.WithArray.data.unshift(item);

			this.emit("itemInsertUnshift", [0]);
			this.emit("itemInsert", [0]);
			return true;
		}
		, itemShift: function () {
			if (this.internal.WithArray.data.length > 0) {
				if (!this.emit("itemOutputFilter", [0, this.internal.WithArray.data[0]])) return null;
				if (!this.emit("itemOutputShiftFilter", [0, this.internal.WithArray.data[0]])) return null;
				var ret = this.internal.WithArray.data.shift();
				this.emit("itemRemoveShift", [0]);
				this.emit("itemRemove", [0]);
				return ret;
			}
			return null;
		}
		, itemPeekTop: function () {
			if (this.internal.WithArray.data.length > 0) return this.internal.WithArray.data[this.internal.WithArray.data.length - 1];
			return null;
		}
		, itemPeekFirst: function () {
			if (this.internal.WithArray.data.length > 0) return this.internal.WithArray.data[0];
			return null;
		}
		, itemRemove: function (item) {
			for (var x = 0; x < this.internal.WithArray.data.length; x++) {
				if (this.internal.WithArray.data[x] == item) {
					if (!this.emit("itemOutputFilter", [x, this.internal.WithArray.data[x]])) return null;
					var ret = this.internal.WithArray.data.splice(x, 1);
					this.emit("itemRemove", [x]);
					return ret;
				}
			}
			return null;
		}
		, itemRemoveComplex: function (callback) {
			for (var x = 0; x < this.internal.WithArray.data.length; x++) {
				if (callback(x, this.internal.WithArray.data[x])) {
					if (!this.emit("itemOutputFilter", [x, this.internal.WithArray.data[x]])) return null;
					var ret = this.internal.WithArray.data.splice(x, 1);
					this.emit("itemRemove", [x]);
					return ret;
				}
			}
			return null;
		}
		, itemRemoveAll: function (item) {
			var check1 = false;
			var check2 = false;
			var mark = [];
			while (true) {
				for (var x = 0; x < this.internal.WithArray.data.length; x++) {
					if (this.internal.WithArray.data[x] == item) {
						if (!this.emit("itemOutputFilter", [x, this.internal.WithArray.data[x]])) return null;
						mark.push(x);
						check1 = true;
						check2 = true;
						break;
					}
				}
				if (!check1) break;
				check1 = false;
			}
			if (check2) {
				var ret = [];
				for (var x = mark.length - 1; x >= 0; x--) {
					ret = ret.concat(this.internal.WithArray.data.splice(mark[x], 1));
					this.emit("itemRemove", [mark[x]]);
				}
				return ret;
			}
			return false;
		}
		, itemRemoveAllComplex: function (callback) {

			var check1 = false;
			var check2 = false;

			var mark = [];
			while (true) {
				for (var x = 0; x < this.internal.WithArray.data.length; x++) {
					if (callback(x, this.internal.WithArray.data[x])) {
						if (!this.emit("itemOutputFilter", [x, this.internal.WithArray.data[x]])) return null;
						mark.push(x);
						check1 = true;
						check2 = true;
						break;
					}
				}
				if (!check1) break;
				check1 = false;
			}
			if (check2) {
				var ret = [];
				for (var x = mark.length - 1; x >= 0; x--) {
					ret.concat(this.internal.WithArray.data.splice(mark[x], 1));
					this.emit("itemRemove", [mark[x]]);
				}
				return ret;
			}
			return false;

		}
		, itemFindFirstIndex: function (start, item) {
			for (var x = start; x < this.internal.WithArray.data.length; x++) {
				if (this.internal.WithArray.data[x] == item)
					return x;
			}
			return -1;
		}
		// callback(index,value)
		, itemFindFirstIndexComplex: function (start, callback) {
			for (var x = start; x < this.internal.WithArray.data.length; x++) {
				if (callback(x, this.internal.WithArray.data[x])) {
					return x;
				}
			}
			return -1;
		}
		// for replaceAllComplex, use itemMap
		, itemReplaceAll: function (item, replacement) { // commit style
			var check1 = false;
			var check2 = false;
			var mark = [];
			while (true) {
				for (var x = 0; x < this.internal.WithArray.data.length; x++) {
					if (this.internal.WithArray.data[x] == item) {
						if (!this.emit("itemInputFilter", [x, this.internal.WithArray.data[x], replacement])) return false;
						mark.push(x);
						check1 = true;
						check2 = true;
						break;
					}
				}
				if (!check1) break;
				check1 = false;
			}
			if (check2) {
				for (var x = 0; x < mark.length; x++) {
					var oldvalue = this.internal.WithArray.data[mark[x]];
					var newvalue = this.internal.WithArray.data[mark[x]] = replacement;
					this.emit("itemChange", [mark[x], oldvalue, newvalue]);
				}
				return true;
			}
			return false;
		}
		, itemReplaceAllComplex: function (callback) { // commit style
			var check1 = false;
			var check2 = false;
			var mark = [];
			while (true) {
				for (var x = 0; x < this.internal.WithArray.data.length; x++) {
					var oldvalue = this.internal.WithArray.data[x];
					throw "do not return new value?";
					var r = callback(this.internal.WithArray.data[x]);
					if (r == null) {
						if (!this.emit("itemInputFilter", [x, oldvalue, r])) return false;
						mark.push([x, r]); // here using null
						check1 = true;
						check2 = true;
						break;
					}
				}
				if (!check1) break;
				check1 = false;
			}
			if (check2) {
				for (var x = mark.length - 1; x >= 0; x--) {
					var oldvalue = this.internal.WithArray.data[mark[x][0]];
					var newvalue = this.internal.WithArray.data[mark[x][0]] = mark[x][1];
					this.emit("itemChange", [mark[x], oldvalue, newvalue]);
				}
				return true;
			}
			return false;
		}
		, itemReplaceAt: function (index, value) {
			if (index >= 0 && index < this.internal.WithArray.data.length) {
				if (!this.emit("itemInputFilter", [index, this.internal.WithArray.data[index], value])) return false;
				var oldvalue = this.internal.WithArray.data[index]
				this.internal.WithArray.data[index] = value;
				this.emit("itemChange", [index, oldvalue, value]);
			} else {
				throw "WithArray.itemAt index out of bounds.";
			}
		}
		, itemGetAt: function (index) {
			if (index >= 0 && index < this.internal.WithArray.data.length) {
				return this.internal.WithArray.data[index];
			} else {
				throw "WithArray.itemAt index out of bounds.";
			}
		}
		, itemRemoveAt: function (index) {
			if (index >= 0 && index < this.internal.WithArray.data.length) {
				if (!this.emit("itemOutputFilter", [index, this.internal.WithArray.data[index]])) return null;
				var r = this.internal.WithArray.data.splice(index);
				this.emit("itemRemove", [index]);
				return r;
			} else {
				throw "WithArray.itemRemoveAt index out of bounds.";
			}
		}
		, itemFindValue: function (callback) {
			for (var x = 0; x < this.internal.WithArray.data.length; x++) {
				if (callback(x, this.internal.WithArray.data[x])) {
					return this.internal.WithArray.data[x];
				}
			}
			return null;
		}
		, itemMap: function (callback) { // commit style
			var mark = [];
			for (var x = 0; x < this.internal.WithArray.data.length; x++) {
				var nvalue = callback(x, this.internal.WithArray.data[x]);
				if (!this.emit("itemInputFilter", [x, this.internal.WithArray.data[x], nvalue])) return false;
				mark.push([x, nvalue]);
			}
			for (var x = 0; x < mark.length; x++) {
				var oldvalue = this.internal.WithArray.data[mark[x][0]];
				var newvalue = this.internal.WithArray.data[mark[x][0]] = mark[x][1];
				this.emit("itemChange", [mark[x][0], oldvalue, newvalue]);
			}
			return false;
		}
		, itemClear: function () { // remove all no check except for output_filter, commit style

			for (var y = 0; y < this.internal.WithArray.data.length; y++) {
				//console.log("remove",this.internal.WithArray.data[y]);
				if (!this.emit("itemOutputFilter", [y, this.internal.WithArray.data[y]])) return false;
			}
			var ret = [];
			while (this.internal.WithArray.data.length > 0) {
				ret.push(this.internal.WithArray.data.shift());
				var i = this.internal.WithArray.data.length;
				this.emit("itemRemove", [i]);
			}
			return ret;
		}
		, itemAmount: function () {
			return this.internal.WithArray.data.length;
		}
		, itemSplice: function () {
			return this.internal.WithArray.data.splice.apply(this.internal.WithArray.data, Array.prototype.slice(arguments, 0));
		}
	}
});

Class.define("WithAlias", {
	from: ["WithEvents"]
	, ctor: function () { // map reduce requires event tracking, so this is alpha
		this.internal.WithAlias.data = {};
	}
	, proto: {
		varEach: function (map) {
			for (var key in this.internal.WithAlias.data) {
				this.internal.WithAlias.data[key] = map(key, this.internal.WithAlias.data[key]);
			}
		},
		varKeys: function (map) {
			for (var key in this.internal.WithAlias.data) {
				map(key);
			}
		},
		varValues: function (map) {
			for (var key in this.internal.WithAlias.data) {
				map(this.internal.WithAlias.data[key]);
			}
		},
		varSet: function (key, value) {
			this.internal.WithAlias.data[key] = value;
		},
		varExists: function (key) {
			if (key in this.internal.WithAlias.data) return true;
			return false;
		},
		varNamesByValue: function (value) {
			var ret = [];
			for (var key in this.internal.WithAlias.data) {
				if (this.internal.WithAlias.data[key] == value) {
					ret.push(key);
				}
			}
			return ret;
		},
		varGet: function (key) {
			if (key in this.internal.WithAlias.data) {
				return this.internal.WithAlias.data[key];
			} else {
				return null;
			}
		},
		varRename: function (oldkey, newkey) {
			if (oldkey in this.internal.WithAlias.data) {
				if (newkey in this.internal.WithAlias.data) {
					return false;
				} else {
					this.internal.WithAlias.data[newkey] = this.internal.WithAlias.data[oldkey];
					this.varUnset(oldkey);
					this.emit("varRename", [oldkey, newkey]);
					return true;
				}
			} else {
				return false;
			}
		},
		varUnset: function (key) {
			if (key in this.internal.WithAlias.data) {
				this.internal.WithAlias.data[key] = null;
				delete this.internal.WithAlias.data[key];
			}
		},
		varClear: function () {
			var keys = [];
			for (var key in this.internal.WithAlias.data)
				keys.push(key);
			while (keys.length > 0) {
				var key = keys.pop();
				this.internal.WithAlias.data[key] = null;
				delete this.internal.WithAlias.data[key];
			}

		}
	}
});




Class.define("XMath");
Class.define("XMath.UnitCounter", {
	ctor: function () {
		this.value = 0;
	},
	proto: {

		inc: function () {
			this.value += 1;
		},
		dec: function () {
			this.value -= 1;
		},
		get: function () {
			return this.value;
		},
		getInc: function () {
			var r = this.value;
			this.value += 1;
			return r;
		},
		getDec: function () {
			var r = this.value;
			this.value -= 1;
			return r;
		},
		incGet: function () {
			this.value += 1;
			return this.value;
		},
		reset: function (start) {
			if (start == undefined || start == null)
				this.value = 0;
			else
				this.value = start;
		},
		decGet: function () {
			this.value -= 1;
			return this.value;
		},
		str: function () {

		}
	}
});
DOMElementCount = Class.create("XMath.UnitCounter");
TabIndexCount = Class.create("XMath.UnitCounter");

var ____HtmlTags2 = [
	"a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont",
	"bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "caption", "canvas", "center", "cite", "code", "col",
	"colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed",
	"fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3",
	"h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label",
	"legend", "li", "listing", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noframes", "noscript",
	"object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "portal", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby",
	"s", "samp", "script", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub",
	"summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul",
	"var", "video", "wbr", "xmp",
	"svg", "path"
];
/*
var ____HtmlTags2 = [
	"a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont",
	"bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "center", "cite", "code", "col",
	"colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed",
	"fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3",
	"h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label",
	"legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noframes", "noscript",
	"object", "ol", "opgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby",
	"s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub",
	"summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul",
	"var", "video", "wbr",

	"svg", "path"
];
*/
const ____SvgTags2 = [
	"svg",
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animate",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"circle",
	"clipPath",
	"color-profile",
	"cursor",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"font",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignObject",
	"feMorphology",
	"g",
	"glyph",
	"glyphRef",
	"hkern",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"metadata",
	"missing-glyph",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"set",
	"stop",
	"style",
	"switch",
	"symbol",
	"text",
	"textPath",
	"title",
	"tref",
	"tspan",
	"use",
	"view",
	"vkern"
]
____HtmlTags2.reverse();


Object.defineProperty(this, "____HtmlTags", {
	value: ____HtmlTags2,
	writable: false,
	configurable: false,
	enumerable: false
});

var ____CustomHtml = [];
function AddCustomHtmlTags() {
	for(var x = 0; x < arguments.length;x++) {
		var t = Object.prototype.toString.apply(arguments[x]);
		if(t == "[object Array]") {
			for(var y = 0; y < arguments[x].length;y++) {
				AddCustomHtmlTags(arguments[x][y]);
			}
		} else if(t == "[object String]") {
			var check = false;
			for(var y = 0; y < ____CustomHtml.length;y++) {
				if(____CustomHtml[y] == arguments[x]) {
					check = true;
					break;
				}
			}
			if(!check) {
				____HtmlTags2.push(arguments[x]);
				____CustomHtml.push(arguments[x]);
			}
		}
	}
}
function RemoveCustomHtmlTags() {
	for(var x = 0; x < arguments.length;x++) {
		var t = Object.prototype.toString.apply(arguments[x]);
		if(t == "[object Array]") {
			for(var y = 0; y < arguments[x].length;y++) {
				RemoveCustomHtmlTags(arguments[x][y]);
			}
		} else if(t == "[object String]") {
			for(var y = 0; y < ____CustomHtml.length;y++) {
				if(____CustomHtml[y] == arguments[x] ) {
					____CustomHtml.splice(y,1);
					for(var z = 0; z < ____HtmlTags2.length;z++) {
						if(____HtmlTags2[z] == arguments[x]) {
							____HtmlTags2.splice(z,1);
							break;
						}
					}
					break;
				}
			}
		}
	}
}

____SvgTags2.reverse();
Object.defineProperty(this, "____SvgTags", {
	value: ____SvgTags2,
	writable: false,
	configurable: false,
	enumerable: false
});

Class.define("UI");
UI = {}; // UI.init and UI.load are the main
UI.Component = {};
UI.Component.Debug = {
	any : false
};
UI.Component.staticContext = {};

UI.Component.ConvertAspect = function (schema, target) {
	return {
		el: schema.el[target],
		$: schema.$[target],
		schema: schema.schema[target],
		exports: schema.exports[target],
		conv: schema.conv[target]
	};
};

function checkTag(tag) {
	for(var x = 0; x < ____HtmlTags2.length;x++) {
		if(____HtmlTags2[x] == tag) {
			return "html";
		}
	}
	for(var x = 0; x < ____SvgTags2.length;x++) {
		if(____SvgTags2[x]==tag) {
			return "svg";
		}
	}
	return "";
}

UI.Component.tagfyString = function(name,super_file,spec) { 
	// tag is not only super file. this makes hard build, a compilation if has spec. typescript merge only data, not ctors and fields.
	var c = checkTag(name);
	if(c=="html") throw new Error("can't register tag '" + name + "' cause its an html tag.");
	if(c=="svg") throw new Error("can't register tag '" + name + "' cause its an svg tag.");
	spec = spec || {};
	var _from = ["Component"];
	if("from" in spec) {
		for(var x = 0; x < spec.from.length;x++) {
			var check = false;
			for(var y = 0; y < _from.length;y++) {
				if(spec.from[x] == _from[y]) {
					check = true;
					break;
				}
			}
			if(!check) {
				_from.push(spec.from[x]);
			}
		}
	}
	var _proto = {};
	if("proto" in spec) {
		_proto = spec.proto;
	}
	UI.Component.staticContext[name] = {};
	Class.define(name, {
		from: _from, 
		ctor: function () {
			var self = this;
			var module = { 
				exports : {} 
			};
			var ctor = [];
			for(var x = 0; x < arguments.length;x++) ctor.push(arguments[x]);
			this.on("elementBuild",async  (context, _export )=>{ // seal
				this.setAttribute("tag",name);
				var _path_sentence = function(aw) {
					var arr = [];
					for(var x = 0; x < aw.length;x++)  { if(aw[x] in this.propsOrder) { for(var y = 0; y < this.propsOrder[aw[x]].length;y++) { arr.push([this.propsOrder[ aw[x] ][y],aw[x]]); } } }
					arr.sort((a,b)=>{ if(a[0] < b[0]) return -1; if(a[0] == b[0]) return 0; return 1; })
					var sentence = [];
					for(var x = 0; x < arr.length;x++) { sentence.push(arr[x][1]); }
					return sentence;
				}
				var schema = await self.elementSetPacketAsync(super_file,{
					context : { 
						module , props : self.elementGetProperties(), propsOrder : self.elementGetPropertiesOrder(), sentence : _path_sentence, ctor
					}
				});
				//elc.setAttribute("original",options.originalParent);
				var _set_onappendchild = (parent)=>{
					parent.on("appendchild",module.exports["@appendchild"]);
					parent.elementSetInterceptExports(module.exports);
				}
				if("@appendchild" in module.exports) {
					if("$childrenTarget" in schema.$) {
						_set_onappendchild(schema.$["$childrenTarget"]);
					}
					if("@childs" in module.exports) {
						for(var x = 0; x < module.exports["@childs"].length;x++) {
							_set_onappendchild(
								"selectedChild" in schema.$[ module.exports["@childs"][x] ].internal.Component ? 
								schema.$[ module.exports["@childs"][x] ].internal.Component.selectedChild : 
								schema.$[ module.exports["@childs"][x] ]
							)
						}
					}
				}
				var _set_onremovechild = (_parent)=>{
					_parent.on("appendchild",(node,parent)=>{
						node.$.setAttribute("removechild",true);
						node.$.setAttribute("original",self);
						node.$.setAttribute("childParent",_parent);
						return true;
					});
					_parent.on("removechild",module.exports["@removechild"]);
					_parent.elementSetInterceptExports(module.exports);
				};
				if("@removechild" in module.exports) {
					if("$childrenTarget" in schema.$) {
						_set_onremovechild(schema.$["$childrenTarget"]);
					}
					if("@childs" in module.exports) {
						for(var x = 0; x < module.exports["@childs"].length;x++) {
							_set_onremovechild(
								"selectedChild" in schema.$[ module.exports["@childs"][x] ].internal.Component ? 
								schema.$[ module.exports["@childs"][x] ].internal.Component.selectedChild : 
								schema.$[ module.exports["@childs"][x] ]
							);
						}
					}
				}
				self.elementSetSchema(schema);
				self.elementSetExports(module.exports);
				_export(
					module.exports,
					schema
				);
				if("ctor" in spec) {
					spec.ctor.apply(self);
				}
				self.elementPush = null;
				self.elementUnshift = null;
				self.elementPop = null;
				self.elementShift = null;
				self.elementRemove = null;
				self.elementRename = null;
				self.elementsClear = null;
			});
		},
		proto : _proto
	});
}
UI.Component.tagfyURL = async function(name,url,spec) {
	var c = checkTag(name);
	if(c=="html") throw new Error("can't register tag '" + name + "' cause its an html tag.");
	if(c=="svg") throw new Error("can't register tag '" + name + "' cause its an svg tag.");
	await new Promise((resolve, reject) => {
		try {
			Import({ method: "GET", url })
				.done(async (data) => {
					//console.log("EVAL COMPONENT SRC", data);
					ComponentCache[url] = data;
					spec = spec || {};
					var _from = ["Component"];
					if("from" in spec) {
						for(var x = 0; x < spec.from.length;x++) {
							var check = false;
							for(var y = 0; y < _from.length;y++) {
								if(spec.from[x] == _from[y]) {
									check = true;
									break;
								}
							}
							if(!check) {
								_from.push(spec.from[x]);
							}
						}
					}
					var _proto = {};
					if("proto" in spec) {
						_proto = spec.proto;
					}
					UI.Component.staticContext[name] = {};
					Class.define(name, {
						from: _from, 
						ctor: function () {
							var self = this;
							var module = { exports : {} };
							var ctor = [];
							for(var x = 0; x < arguments.length;x++) ctor.push(arguments[x]);
							this.on("elementBuild",async (context, _export)=>{ // seal
								this.setAttribute("tag",name);
								var _path_sentence = function(aw) {
									var arr = [];
									for(var x = 0; x < aw.length;x++)  { if(aw[x] in this.propsOrder) { for(var y = 0; y < this.propsOrder[aw[x]].length;y++) { arr.push([this.propsOrder[ aw[x] ][y],aw[x]]); } } }
									arr.sort((a,b)=>{ if(a[0] < b[0]) return -1; if(a[0] == b[0]) return 0; return 1; })
									var sentence = [];
									for(var x = 0; x < arr.length;x++) { sentence.push(arr[x][1]); }
									return sentence;
								}
								var schema = await self.elementSetPacketAsync(data,{
									context : { module , props : self.elementGetProperties(), propsOrder : self.elementGetPropertiesOrder(), sentence : _path_sentence, ctor },
								});
								var _set_onappendchild = (parent)=>{
									parent.on("appendchild",module.exports["@appendchild"]);
									parent.elementSetInterceptExports(module.exports);
								};
								if("@appendchild" in module.exports) {
									if("$childrenTarget" in schema.$) {
										_set_onappendchild(schema.$["$childrenTarget"]);
									}
									if("@childs" in module.exports) {
										for(var x = 0; x < module.exports["@childs"].length;x++) {
											_set_onappendchild(
												"selectedChild" in schema.$[ module.exports["@childs"][x] ].internal.Component ?
												schema.$[ module.exports["@childs"][x] ].internal.Component.selectedChild : 
												schema.$[ module.exports["@childs"][x] ]
											)
										}
									}
								}
								var _set_onremovechild = (_parent)=>{
									_parent.on("appendchild",(node,parent)=>{
										node.$.setAttribute("removechild",true);
										node.$.setAttribute("original",self);
										node.$.setAttribute("childParent",_parent);
										return true;
									});
									_parent.on("removechild",module.exports["@removechild"]);
									_parent.elementSetInterceptExports(module.exports);
								};
								if("@removechild" in module.exports) {
									if("$childrenTarget" in schema.$) {
										_set_onremovechild(schema.$["$childrenTarget"]);
									}
									if("@childs" in module.exports) {
										for(var x = 0; x < module.exports["@childs"].length;x++) {
											_set_onremovechild(
												"selectedChild" in schema.$[ module.exports["@childs"][x] ].internal.Component ? 
												schema.$[ module.exports["@childs"][x] ].internal.Component.selectedChild : 
												schema.$[ module.exports["@childs"][x] ]
											);
										}
									}
								}
								self.elementSetSchema(schema);
								self.elementSetExports(module.exports);
								_export(
									module.exports,
									schema
								);
								if("ctor" in spec) {
									spec.ctor.apply(self);
								}
								self.elementPush = null;
								self.elementUnshift = null;
								self.elementPop = null;
								self.elementShift = null;
								self.elementRemove = null;
								self.elementRename = null;
								self.elementsClear = null;
							});
						},
						proto : _proto
					});
					resolve(true);
				})
				.fail((e) => {
					alert("error 2:" + e);
					reject();
				})
				.send();
		} catch (e) {
			alert("error 1:" + e);
		}
	}); 
}

Class.define("WithDOMNode", {
	from: ["WithArray", "WithAlias"]
	, ctor: function () {
		this.internal.WithDOMNode.parent = null;
		this.internal.WithDOMNode.parent_component = null;
		this.internal.WithDOMNode.data = {};
		this.internal.WithDOMNode.data.semantics = {};

	},
	proto: {
		nodeBuild: function (parent, parent_component) {
			this.elementDefineParent(parent, parent_component);
			this.emit("nodeBuild");
			return true;
		},
		elementDefineParent: function (parent, parent_component) {
			if (this.internal.WithDOMNode.parent == null) {
				var p = parent;
				if (parent === undefined || parent === null) {
					p = document.body;
				}
				Object.defineProperty(this.internal.WithDOMNode, "parent", {
					get: function () { return p; }
				});

				var p2 = parent_component;
				if (parent_component == undefined || parent_component == null) {
					p2 = null;
				}
				Object.defineProperty(this.internal.WithDOMNode, "parent_component", {
					get: function () { return p2; }
				});

			} else {
				if (parent == this.internal.WithDOMNode.parent) {
					// same, do nothing
				} else {
					throw "WithDOMNode.elementSetParent parent already defined";
				}
			}
		},
		nodeModel : function(name,value) {
			if(arguments.length==1) {
				try {
					var parts = name.split(".");
					var p = this.internal.WithDOMNode.data.semantics;
					for(var x = 0; x < parts.length;x++) {
						if(parts[x] in p) {
							p = p[ parts[x] ];
						} else {
							return null;
						}
					}
					return p;
				} catch(e) {
					return null;
				}
			} else if(arguments.length==2) {
				try {
					var parts = name.split(".");
					var p = this.internal.WithDOMNode.data.semantics;
					var last;
					for(var x = 0; x < parts.length;x++) {
						if(parts[x] in p) {
							last = { p, name : parts[x] };
							p = p[ parts[x] ];
						} else {
							p[ parts[x] ] = {};
							last = { p, name : parts[x] };
							p = p[ parts[x] ];
						}
					}
					last.p[ last.name ] = value;
					return true;
				} catch(e) {
					return false;
				}
			}
		},
		nodeWalk : async function(name,find_pattern_find_callback) {
			if(arguments.length==1) { //find_pattern_find_callback
				console.log("nodeWalk 1arg");
				var _type = Object.prototype.toString.apply(find_pattern_find_callback);
				if(this.itemAmount()>0) {
					var stack = [
						[ this, 0 ]
					];
					while(stack.length>0) {
						var item = stack.pop();
						if( item[1] < item[0].itemAmount()) {
							var target = item[0].itemGetAt(item[1]);
							if(target.tag == "complex_element") {
								if(_type == "[object Function]") {
									find_pattern_find_callback(
										target.complex,
										target.el
									);
								} else if(_type == "[object AsyncFunction]") {
									await find_pattern_find_callback(
										target.complex,
										target.el
									);
								}
								stack.push([item[0], item[1]+1]);
								stack.push([target.complex,0]);
								continue;
							} else {
								if(_type == "[object Function]") {
									find_pattern_find_callback(
										target.component,
										target.el
									);
								} else if(_type == "[object AsyncFunction]") {
									await find_pattern_find_callback(
										target.component,
										target.el
									);
								}
								stack.push([item[0], item[1]+1]);
								stack.push([target.component,0]);
								continue;
							}
						}
					}
				}

			} else if(arguments.length==2) {// name,find_pattern_find_callback
				console.log("nodeWalk 2args");
				var _type = Object.prototype.toString.apply(find_pattern_find_callback);
				if(this.itemAmount()>0) {
					var stack = [
						[ this, 0 ]
					];
					while(stack.length>0) {
						var item = stack.pop();
						if( item[1] < item[0].itemAmount()) {
							var target = item[0].itemGetAt(item[1]);
							if(target.tag == "complex_element") {
								if(_type == "[object Function]") {
									if(target.complex.nodeModel(name)!=null)
										find_pattern_find_callback(
											target.complex.nodeModel(name),
											target.complex,
											target.el
										);
								} else if(_type == "[object AsyncFunction]") {
									if(target.complex.nodeModel(name)!=null)
										await find_pattern_find_callback(
											target.complex.nodeModel(name),
											target.complex,
											target.el
										);
								}
								stack.push([item[0], item[1]+1]);
								stack.push([target.complex,0]);
								continue;
							} else {
								if(_type == "[object Function]") {
									if(target.component.nodeModel(name)!=null)
										find_pattern_find_callback(
											target.component.nodeModel(name),
											target.component,
											target.el
										);
								} else if(_type == "[object AsyncFunction]") {
									if(target.component.nodeModel(name)!=null)
										await find_pattern_find_callback(
											target.component.nodeModel(name),
											target.component,
											target.el
										);
				
								}
								stack.push([item[0], item[1]+1]);
								stack.push([target.component,0]);
								continue;
							}
						}
					}
				}
			}
		},
		nodeDispose: function () {
			this.itemClear();
			this.varClear();
			this.emit("nodeDispose");
			return true;
		}
	}
});
var DEBUG_COMPONENT_LEVEL = 0;
ComponentCache = {};
var newPacketAsync_id = 0;
var newPacketAsync_stack = 0;
Class.define("Component", {
	from: ["WithDOMNode"]
	, ctor: function () {
		var self = this;
		this.internal.Component.data = {};
		this.internal.Component.parent = null;
		this.internal.Component.localId = 0;
		this.internal.Component.default_itemInputFilter_lock = function (index, oldvalue, newvalue) {
			return false;
		};
		this.internal.Component.default_itemInputPushFilter = function (index, oldvalue, newvalue) {

			return true;
		};
		this.on("itemInputPushFilter", this.internal.Component.default_itemInputPushFilter);
		this.internal.Component.default_itemInsertPush = function (index) {

			var newvalue = self.internal.WithArray.data[index];
			if (newvalue.tag == "complex_element") {

				var id = "_" + DOMElementCount.getInc();
				newvalue.id = id;
				newvalue.complex.internal.Component.id = id;
				if (!newvalue.complex.nodeBuild(newvalue.parent, self)) {
					throw "error on build " + newvalue.name;
				}


			} else {


				var el, id;
				var isSvg = ____SvgTags.indexOf(newvalue.tag) != -1;
				var isHtml = ____HtmlTags.indexOf(newvalue.tag) != -1;
				if (isSvg) {
					el = document.createElementNS("http://www.w3.org/2000/svg", newvalue.tag);
					el.setAttributeNS('http://www.w3.org/2000/svg', 'xlink', 'http://www.w3.org/1999/xlink');
				} else if (isHtml) {

					el = document.createElement(newvalue.tag);
				}
				id = "_" + DOMElementCount.getInc();
				newvalue.id = id;
				el.setAttribute("id", id);
				newvalue.el = el;
				var _parent = self.internal.WithDOMNode.parent_component;
				//console.log("PARENT:",_parent);
				if (!_parent) {
					newvalue.parent.appendChild(el);
					//throw "must have a container except for UI.Body";
				} else {

					// find first non complex_element

					//	find pos at parent
					var _self = self;
					var found = false;

					while (_parent != null) {
						//console.log(">1");
						var pos = -1;
						var arr = _parent.internal.WithArray.data;
						for (var x = 0; x < arr.length; x++) {
							if (arr[x].tag == "complex_element" && arr[x].complex == _self) {
								//alert("OK");
								pos = x;
								break;
							} else if (arr[x].component == _self) {
								// inside a non complex_element, so push here
								if (arr[x].el == newvalue.parent) {
									found = true;
									newvalue.parent.appendChild(newvalue.el);
								} else {
									throw "what is this alignment?";
								}
								break;
							}
						}
						if (!found) {
							//console.log(">2");
							//console.log("A3");
							for (var x = pos + 1; x < arr.length; x++) {
								//console.log(">4");
								if (arr[x].tag != "complex_element") { // found
									//console.log(">5");
									if (newvalue.parent == arr[x].parent) {
										//console.log(el,arr[x].el);
										newvalue.parent.insertBefore(el, arr[x].el);
										found = true;
										break;
									} else {
										throw "what is this alignment?";
									}
								} else {
									//console.log(">6");
									// run throught complex_element (recursive);
									function _c1(a, b, c) {
										//console.log("@@@",newvalue.parent, newvalue.el, _arr[y].el);
									}
									function _i1(a, b, c) {
										//console.log(">>",a);
										a.insertBefore(b, c);
									}
									//console.log("??");
									var stack = [[arr[x].complex, 0]];
									while (stack.length > 0) {
										var item = stack.pop();
										var pos = item[1];
										var node = item[0];
										var _arr = node.internal.WithArray.data;
										for (var y = pos; y < _arr.length; y++) {
											if (_arr[y].tag != "complex_element") {
												if (newvalue.parent == _arr[y].parent) {
													//_c1(newvalue.parent, newvalue.el, _arr[y].el);
													//console.log("@@",el,_arr[y].el,newvalue.parent);
													_i1(newvalue.parent, newvalue.el, _arr[y].el);
													//newvalue.parent.insertBefore(newvalue.el, _arr[y].el);

													found = true;
													break;
												}
											} else {
												stack.push([node, pos + 1]);
												stack.push([_arr[y].complex, 0]);
												break;
											}
										}
										//console.log("A1");
										if (found) {
											//console.log("OK");
											break;

										}
									}
									//console.log(">found",found);
									if (found) break;
								}
							}
						}
						if (!found) {
							//console.log(">3");
							_self = _parent;
							_parent = _parent.internal.WithDOMNode.parent_component;
							if (_parent == null) { // not found at all, so its the last
								newvalue.parent.appendChild(newvalue.el);
							}
						} else {
							break;
						}
					}
				}

				newvalue.component = Class.create("Component");
				newvalue.el._component = newvalue.component;
				newvalue.component.elementDefineParent(newvalue.el);

			}
		};

		this.on("itemInsertPush", this.internal.Component.default_itemInsertPush);
		this.internal.Component.default_itemInputUnshiftFilter = function (index, oldvalue, newvalue) {
			return true;
		};
		this.internal.Component.default_itemInsertUnshift = function (index) {
			var newvalue = this.internal.WithArray.data[index];
			if (newvalue.tag == "complex_element") {
				var id = "_" + DOMElementCount.getInc();
				newvalue.id = id;
				newvalue.complex.internal.Component.id = id;
				if (!newvalue.complex.nodeBuild(newvalue.parent, self)) {
					throw "error on build " + newvalue.name;
				}
				// unshift here just build component, its the same of push

			} else {

				var el, id;
				var isSvg = ____SvgTags.indexOf(newvalue.tag) != -1;
				var isHtml = ____HtmlTags.indexOf(newvalue.tag) != -1;
				console.log("UNSHIFT", newvalue.tag);
				if (isSvg) {
					el = document.createElementNS("http://www.w3.org/2000/svg", newvalue.tag);
					el.setAttributeNS('http://www.w3.org/2000/svg', 'xlink', 'http://www.w3.org/1999/xlink');
				} else if (isHtml) {

					el = document.createElement(newvalue.tag);
				}
				id = "_" + DOMElementCount.getInc();
				newvalue.id = id;
				el.setAttribute("id", id);


				// reverse find last newvalue.tag!=complex_element to 'insertAfter' (1)
				// to 'insertAfter' we get the next of that one and insertBefore, 
				// if there is no newvalue.tag!=complex_element after that we found in (1) or the next is 'this' or end of search then we append.

				var _parent = self.internal.WithDOMNode.parent_component;

				if (!_parent) {
					//console.log("found body");

					if (newvalue.parent.childNodes.length > 0)
						newvalue.parent.insertBefore(el, newvalue.parent.childNodes[0]);
					else
						newvalue.parent.appendChild(el);
				} else {
					var _self = self;
					var found = false;
					while (_parent != null) {
						var arr = _parent.internal.WithArray.data;
						var pos = _parent.internal.WithArray.data.length - 1;
						for (var x = pos; x >= 0; x--) {

							if (arr[x].tag == "complex_element" && arr[x].complex == _self) { //test
								pos = x;
								break;
							} else if (arr[x].component == _self) {
								// inside a non complex_element, so unshift here
								if (arr[x].el == newvalue.parent) {
									found = true;
									if (newvalue.parent.childNodes.length > 0)
										newvalue.parent.insertBefore(el, newvalue.parent.childNodes[0]);
									else
										newvalue.parent.appendChild(el);
								} else {
									throw "what is this alignment?";
								}
								break;
							}

						}
						if (!found) { // current _self is the component that holds the pointer
							for (var x = pos - 1; x >= 0; x--) {
								if (arr[x].tag != "complex_element") { // found
									var _p = -1;
									for (var y = 0; y < newvalue.parent.childNodes.length; y++) {
										if (newvalue.parent.childNodes[y] == arr[x].el) {
											//console.log("##########A");
											_p = y;
											break;
										}
									}
									if (_p != -1) {
										if (_p + 1 < newvalue.parent.childNodes.length) {
											found = true;
											newvalue.parent.insertBefore(el, newvalue.parent.childNodes[_p + 1]);
										} else {
											found = true;
											newvalue.parent.appendChild(el);
										}
									} else { // last
										found = true;
										newvalue.parent.appendChild(el);
									}
									break;
								} else {

									var stack = [[arr[x].complex, arr[x].complex.internal.WithArray.data.length - 1]];

									while (stack.length > 0) {
										var item = stack.pop();
										var pos = item[1];
										var node = item[0];
										var _arr = node.internal.WithArray.data;
										for (var y = pos; y >= 0; y--) {
											if (_arr[y].tag != "complex_element") {
												if (newvalue.parent == _arr[y].parent) {
													var _p = -1;
													for (var z = 0; z < newvalue.parent.childNodes.length; z++) {
														if (newvalue.parent.childNodes[z] == _arr[y].el) {
															_p = z;
															break;
														}
													}
													if (_p != -1) {
														if (_p + 1 < newvalue.parent.childNodes.length) {
															newvalue.parent.insertBefore(el, newvalue.parent.childNodes[_p + 1]);
														} else {
															newvalue.parent.appendChild(el);
														}
													} else {
														newvalue.parent.appendChild(el);
													}
													found = true;
													break;
												}
											} else {
												stack.push([node, pos - 1]);
												stack.push([_arr[y].complex, _arr[y].complex.internal.WithArray.data.length - 1]);
												break;
											}
											if (found) break;
										}
									}

								}
							}
						}
						if (!found) {
							//console.log("y");
							_self = _parent;
							_parent = _parent.internal.WithDOMNode.parent_component;
							if (_parent == null) { // not found at all, so its the last
								if (newvalue.parent.childNodes.length > 0)
									newvalue.parent.insertBefore(el, newvalue.parent.childNodes[0]);
								else
									newvalue.parent.appendChild(el);
							}
						} else {
							break;
						}
					}
				}
				newvalue.el = el;
				newvalue.component = Class.create("Component");
				newvalue.el._component = newvalue.component;
				newvalue.component.elementDefineParent(newvalue.el);
			}
		};

		this.internal.Component.default_itemInputReplaceFilter = function (index, oldvalue, newvalue) {
			if (oldvalue != null) {
				// must dispose oldvalue

			}
		};


		this.on("itemInputUnshiftFilter", this.internal.Component.default_itemInputUnshiftFilter);
		this.on("itemInsertUnshift", this.internal.Component.default_itemInsertUnshift);

		this.internal.Component.default_itemOutputPopFilter = function (index, value) {

		};
		this.internal.Component.default_itemOutputShiftFilter = function (index, value) {

		};
		this.internal.Component.default_itemOutputFilter = function (index, value) {
			//console.error("remove base");
			if ("component" in value) {
				if(value.component.getAttribute("removechild")!=null) {
					console.error("has capture2");
				}
				//value.component.nodeDispose();

			}
			if (value.tag == "complex_element") {
				if(value.complex.getAttribute("removechild")!=null) {
					//console.error("has capture1");
					var original = value.complex.getAttribute("original");
					//console.error("original",original);
					if(original!=null) { // is a packet one event for clear, we need multple emit inside this $children
						var cp = value.complex.getAttribute("childParent");
						//console.error(cp);
						cp.emit("removechild",[
							{$:value.complex},
							{$:original,exports:cp.elementGetInterceptExports() }
						]);
					}
				}
				value.complex.nodeDispose();
				//console.error("remove complex");
			} else {
				try {
					if(value.component.getAttribute("removechild")) {
						if(value.component.getAttribute("removechild")!=null) {
							//console.error("has capture1");
							var original = value.component.getAttribute("original");
							//console.error("original",original);
							if(original!=null) { // is a packet one event for clear, we need multple emit inside this $children
								var cp = value.component.getAttribute("childParent");
								//console.error(cp);
								cp.emit("removechild",[
									{$:value.component,el:value.el},
									{$:original,exports:cp.elementGetInterceptExports() }
								]);
							}
						}
					}
					value.component.nodeDispose();
					value.parent.removeChild(value.el);
					this.varUnset(value.name);
					//console.error("removing",value.el.nodeName,value.el.innerHTML);
					
					
				} catch (e) {
					//console.log(value.name,e);
					//console.log("!!",value.parent,value.el);
					var b = [];
					for (var x = 0; x < value.parent.childNodes.length; x++) {
						b.push(x, value.parent.childNodes[x]);
					}
					//console.log( b.join(","));
				}
			}
			
			return true;
		};
		this.on("itemOutputFilter", this.internal.Component.default_itemOutputFilter);

		var elementNew = function () {
			self.internal.Component.localId += 1;
			if (arguments.length == 1) {
				var tag, name, type, complex;
				var isSvg = ____SvgTags.indexOf(arguments[0]) != -1;
				var isHtml = ____HtmlTags.indexOf(arguments[0]) != -1;
				if (isSvg || isHtml) {
					name = "(anonymous)";
					tag = arguments[0];
					type = "";
				} else {
					name = "(anonymous)";
					tag = "complex_element";
					var _class_args = {};
					_class_args[arguments[0]] = [];
					if(arguments[0].indexOf(":[")!=-1) { // default constructor
						throw new Error("not implemented.");
					}
					complex = Class.create(arguments[0], _class_args);
					type = arguments[0];
				}
				name = "elem_" + self.internal.Component.localId;
				value = {
					id: self.internal.Component.localId,
					name: name,
					tag: tag,
					el: null,
					type: type,
					complex: complex,
					parent: self.internal.WithDOMNode.parent,
					self: self,
					args: {},
					array: false
				};
				return value;
			} else if (arguments.length == 2) {

				var tag, name, type, complex;
				var isSvg = ____SvgTags.indexOf(arguments[1]) != -1;
				var isHtml = ____HtmlTags.indexOf(arguments[1]) != -1;
				if (isSvg || isHtml) {
					name = arguments[0];
					tag = arguments[1];
					type = "";
				} else {
					name = arguments[0];
					tag = "complex_element";
					var _class_args = {};
					_class_args[arguments[1]] = [];
					if(arguments[1].indexOf(":[")!=-1) { // default constructor
						throw new Error("not implemented.");
					}
					complex = Class.create(arguments[1], _class_args);

					type = arguments[1];
				}
				value = {
					id: self.internal.Component.localId,
					name: name,
					tag: tag,
					el: null,
					type: type,
					self: self,
					complex: complex,
					parent: self.internal.WithDOMNode.parent,
					args: {},
					array: false
				};
				return value;
			} else if (arguments.length == 3) {
				var tag, name, type;
				var isSvg = ____SvgTags.indexOf(arguments[1]) != -1;
				var isHtml = ____HtmlTags.indexOf(arguments[1]) != -1;
				if (isSvg || isHtml) {
					name = arguments[0];
					tag = arguments[1];
					type = "";
				} else {

					name = arguments[0];
					tag = "complex_element";
					if(arguments[1].indexOf(":[")!=-1) { // default constructor
						throw new Error("not implemented.");
					}
					complex = Class.create(arguments[1], arguments[2]);
					type = arguments[1];
				}
				value = {
					id: self.internal.Component.localId,
					name: name,
					tag: tag,
					el: null,
					self: self,
					type: type,
					complex: complex,
					parent: self.internal.WithDOMNode.parent,
					args: {},
					array: false
				};
				return value;

			}
		}
		this.elementPush = function () {

			//	1 -> type:string (anonymous)
			//	2 -> name:string, type:string

			//	must have elementPushPacket
			//	2 -> xml:string, options:object (anonymouse)
			//	3 -> name:string, xml:string, options: object
			//	find first and last real element to add elementInsertBefore(name) elementInsertAfter(name)


			//	3 -> name:string, type:string, options:object

			//	may have elementPushPacketAjax
			//	3 -> ajax:object, options:object, callback:function (anonymous)
			//	4 -> name:string, ajax:object, options:object, callback:function
			//	find is async

			if (this.internal.WithDOMNode.parent == null) {
				console.log("??",this);
				throw "Component.elementPush has no parent defined. Use WithDOMNode.elementDefineParent before. (@)";
			}

			if (arguments.length == 3) {
				//console.log("##3");
				var t = Object.prototype.toString.apply(arguments[2]);
				if (t == "[object Object]") {
					var value = elementNew(arguments[0], arguments[1], arguments[2]);
					//console.log("1>>>>>>>>",value.name,arguments[1]);
					this.varSet(value.name, value);
					this.itemPush(value);

					if (value.tag != "complex_element") {
						BrowserTools.setStyle(value.el, arguments[2]);
					}
					if (value.tag == "complex_element") {
						return {
							$: value.complex
						}
					} else {
						return {
							el: value.el,
							$: value.component
						}
					}
				} else {
					throw "Component.elementPush : third argument must be object.";
				}
			} else if (arguments.length == 2) {
				//console.log("##2");
				var t = Object.prototype.toString.apply(arguments[1]);
				if (t == "[object String]") {
					// (name,type)

					var value = elementNew(arguments[0], arguments[1]);
					//console.log("2>>>>>>>>",value.name,arguments[1]);
					this.itemPush(value);

					this.varSet(value.name, value);

					if (value.tag == "complex_element") {
						return {
							$: value.complex
						}
					} else {
						return {
							el: value.el,
							$: value.component
						}
					}
				} else {
					throw "Component.elementPush : second argument must be string.";
				}
			} else if (arguments.length == 1) {
				//console.log("##1");
				var value = elementNew(arguments[0]);
				// this.varSet(name,value); // no name, so can't refer to this object directly
				this.itemPush(value);
				if (value.tag == "complex_element") {
					return {
						$: value.complex
					}
				} else {
					return {
						el: value.el,
						$: value.component
					}
				}
			} else {
				throw "elementPush : invalid call, must have 1, 2 or 3 arguments";
			}
		};
		this.elementUnshift = function () {

			//	1 -> name:string (tag or component)
			//	2 -> name:string, type:string
			//	2 -> xml:string, options:object
			//	3 -> name:string, type:string, options:object
			//	3 -> ajax:object, options:object, callback:function

			if (this.internal.WithDOMNode.parent == null) {
				throw "Component.elementUnshift has no parent defined. Use WithDOMNode.elementDefineParent before.";

			}

			if (arguments.length == 3) {
				var t = Object.prototype.toString.apply(arguments[2]);
				if (t == "[object Object]") {
					var value = elementNew(arguments[0], arguments[1], arguments[2]);
					this.varSet(value.name, value);
					this.itemUnshift(value);

					if (value.tag != "complex_element") {
						BrowserTools.setStyle(value.el, arguments[2]);
					}

					if (value.tag == "complex_element") {
						return {
							$: value.complex
						}
					} else {
						return {
							el: value.el,
							$: value.component
						}
					}
				} else {
					throw "Component.elementPush : third argument must be object.";
				}
			} else if (arguments.length == 2) {
				// (name,type)
				var t = Object.prototype.toString.apply(arguments[1]);
				if (t == "[object Object]") {

				} else if (t == "[object String]") {
					// (name,type)
					var value = elementNew(arguments[0], arguments[1]);
					this.varSet(value.name, value);
					this.itemUnshift(value);
					if (value.tag == "complex_element") {
						return {
							$: value.complex
						}
					} else {
						return {
							el: value.el,
							$: value.component
						}
					}
				}
			} else if (arguments.length == 1) {
				var value = elementNew(arguments[0]);
				// this.varSet(name,value); // no name, so can't refer to this object directly
				this.itemUnshift(value);
				if (value.tag == "complex_element") {
					return {
						$: value.complex
					}
				} else {
					return {
						el: value.el,
						$: value.component
					}
				}
			} else {
				throw "elementPush : invalid call, must have 1, 2 or 3 arguments";
			}
		};
		var self_newPacketAsync1 = this;
		
		var newPacketAsync = async function (parent, pattern, options) {
			// use correct self.internal.Component.selectedChild
			newPacketAsync_id++;
			newPacketAsync_stack++;


			DEBUG_COMPONENT_LEVEL += 1;
			//console.log("LEVEL:",DEBUG_COMPONENT_LEVEL);
			//pattern = pattern.split("\r").join("").split("\n").join("").split("\t").join(" ");
			//console.log(pattern);
			options = options || {
				runMacro : true
			};
			if(!("runMacro" in options)) {
				options.runMacro = true;
			}
			var ret = {
				el: {},
				$: {},
				conv: {},
				schema: {},
				exports: {}
			};
			if("space" in options) {
				ret = options.space;
			}
			if(!("context" in options)) options.context = {};
			if(options && "context" in options) {
				options.context.children = function(str) {
					if(str==undefined) str = "";
					return "<Component id='$childrenTarget'>"+str+"</Component>";
				}
			}
			var intag = false;
			var intagname = false;
			var intagattrib = false;
			var intagattrib_key = false;
			var intagattrib_val = false;
			var intagattrib_string = false;
			var intagattrib_string2 = false;
			var stack = [];
			var pointer = [{
				element: parent.internal.WithDOMNode.parent,
				container: parent,
			}];
			var text = "";
			var attributes_to_delete = [];
			var ret_pointer = ret;
			var current = {};
			var attrib_count = 0;
			var current_attribute = null;
			var count = 0;

			var globalCharPos = -1;
			async function tag_handle(tag) {
				
				var waitAsync = false;
				var waitTarget = {};
				//console.log(tag.tagName);
				if (tag.endTag) {

					
					if (stack.length > 0 && stack[stack.length - 1].tagName == tag.tagName) {
						// begin inner text
						// last text pos
						//console.error(tag);
						//console.log(tag.tagName);
						var str = pattern.substring(stack[stack.length - 1].beginInnerText, tag.lastTextPos-tag.tagName.length-2);
						
						//console.log(">> AT CHILDRENN FILL",str);
						//console.error("pre children of",stack[stack.length-1].tagName,str);
						if(tag.tagName.indexOf("Template")==0) {
							
							stack[stack.length-1].data.schema.$.$childrenTarget.elementSetPreChildren(str);
							//self.elementSetPreChildren(stack[stack.length-1].data.schema.$.$childrenTarget);
						} else if(
							"data" in stack[stack.length-1] && 
							"schema" in stack[stack.length-1].data &&
							"$childrenTarget" in stack[stack.length-1].data.schema.$
						) {
							// TODO: proxy $childrenTarget, must make a tunnel component.
							// put this into a function to load children, then call at tunnel components. 
							// .setChildren(str,target,context,space)
							// target in this case is stack[stack.length-1].data.schema.$.$childrenTarget
							// context is default, space is ret too
							// extra case: many {{this.children()}}

							
							// store string for later use in creating proxy components.
							self.elementSetPreChildren(str);
							stack[stack.length-1].data.schema.$.$childrenTarget.elementSetPreChildren(str);
							var ss = null;
							await stack[stack.length-1].data.schema.$.$childrenTarget.emit("elementChildren",[str,(change,args, setSchema)=>{
								if(change!=null && change!=undefined) {
									str = change;
									options.context.extra = args;
									ss = setSchema;
								}
							}]);
							if(str!="" && str!=undefined && str!=null && str.trim() != "") {
								//console.error( "PASSED CHILDREN:", JSON.stringify(str) );
								//if(str2!=null && str2!=undefined) { str = str2; }
								var res = await stack[stack.length-1].data.schema.$.$childrenTarget.elementSetPacketAsync(str,{
									context : options.context,
									space : ret
								});
								if(ss) ss( res );
								// copy children context to super context.
								for(var x in res.el) {
									ret.el[x] = res.el[x];
								}
								for(var x in res.$) {
									ret.$[x] = res.$[x];
								}
								for(var x in res.conv) {
									ret.conv[x] = res.conv[x];
								}
								for(var x in res.schema) {
									ret.schema[x] = res.schema[x];
								}
								for(var x in res.exports) {
									ret.exports[x] = res.exports[x];
								}
							} else {
								await stack[stack.length-1].data.schema.$.$childrenTarget.elementsClear();
							}
							await stack[stack.length-1].data.schema.$.$childrenTarget.emit("elementChildrenEnd",[]);
						} else {

							//if(str.indexOf(`<Cell id="cell8" class="a b" tag="button">record</Cell>`)>=0) {
							//	console.log("END TAG",tag.tagName,str);
								if("container" in pointer[pointer.length-1] && pointer[pointer.length-1].element) {
									pointer[pointer.length-1].container.internal.Component.isPrimitive = true;
									//console.log("~~~~~");
									//console.log( pointer[pointer.length-1] );
									//console.log( stack[stack.length-1] );
									//console.log( pointer[pointer.length-1].container ); //.elementSetPreChildren(str);
									//console.log("~~~~~");
									pointer[pointer.length-1].container.elementSetPreChildren(str);
								}
							//	console.log(stack[stack.length-1]);
							//}
							//self.elementSetPreChildren(str);
							
						}
						stack.pop();
						pointer.pop();

					} else {
						
						while (stack.length > 0) {
							stack.pop();
							pointer.pop();
							if (stack.length > 0 && stack[stack.length - 1].tagName == tag.tagName) {
								return;
							}
						}
						console.log(stack, tag.tagName);
						throw "odd tag " + tag.tagName + ":" + globalCharPos;
					}
				} else {
					for(var x = stack.length-1;x >=0;x--) {
						if("isCustom" in stack[x] && stack[x].isCustom) {
							//console.error("ignored",tag.tagName);
							if(!tag.soleTag) {
								stack.push(tag);
								pointer.push({});
							}
							return;
						}
					}
					if (tag.soleTag) {
						
						var id = [""];
						var check = false;
						var value = "";
						var has_src = false;
						var src = "";
						var convert = false;
						var lang = "javascript";
						for (var x = 0; x < tag.attributes.length; x++) {
							if (tag.attributes[x].name == "id") {
								check = true;
								if (tag.attributes[x].value == "") throw "tag with identification must have a name";

								id.push(tag.attributes[x].value);
							} else if (tag.attributes[x].name == "localStorage") {
								has_src = true;
								src = tag.attributes[x].value;
							}
							if (tag.tagName == "text" && tag.attributes[x].name == "value") {
								//value = tag.attributes[x].value;
								var pel = pointer[pointer.length - 1].element;
								//console.error(pel.tagName.toUpperCase())
								if("from" in tag) {
									//console.error("OKA",tag.from,tag.attributes[x].value);
									if(tag.from == "PRE" || tag.from == "TEMPLATE") {
										value = tag.attributes[x].value;
									} else {
										value = BrowserTools.decodeEntities(tag.attributes[x].value);
									}
								} else {
									//console.error("OKB",tag.attributes[x].value);
									value = BrowserTools.decodeEntities(tag.attributes[x].value);
								}
								
							}
						}
						
						var tmp = attributes_to_delete.length;
						while (tmp > 0) { tmp -= 1; attributes_to_delete.pop(); }
						if (!check) { id.push("_" + count); }
						id = id.join("");
						if (tag.tagName == "text") {

							if (value != "") {
								var pel = pointer[pointer.length - 1].element;
								var pec = pointer[pointer.length - 1].container;
								//if(pel) { console.log(">>tag:",pel,pel.tagName,value); }
								if (pel && (
									pel.tagName.toUpperCase() == "STYLE" ||
									pel.tagName.toUpperCase() == "OPTION" ||
									pel.tagName.toUpperCase() == "SPAN" ||
									pel.tagName.toUpperCase() == "SCRIPT" ||
									pel.tagName.toUpperCase() == "TEXTAREA" ||
									pel.tagName.toUpperCase() == "PRE"
								)) {
									if (pel.tagName.toUpperCase() == "SCRIPT") {
										var lang = pel.getAttribute("language")
										if (lang == "comment") {

										} else if (pel.getAttribute("src") != null) {

											pel.appendChild(document.createTextNode("" + value));
											//pec.emit("appendchild",[]);

										} else {
											//get on lazy component, require schema to be defined on load component at ' tag.tagName == "Component" '
											//console.log(value);

											
											
											let sandbox1 = null;
											let code = [`
sandbox1 = async function(schema,code,_self) {
	//console.log(">>@3",code);
	var self = _self;
`];
											for (var key in ret.el) {
												// MUST ASSURE THAT NAMES ARE NOT INJECTED. just literals.
												if(!(
													key == "this" ||
													key == "if" ||
													key == "class" ||
													key == "extends" ||
													key == "import" ||
													key == "else" ||
													key == "var" ||
													key == "let" ||
													key == "await" ||
													key == "return" ||
													key == "do" ||
													key == "while" ||
													key == "for" ||
													key == "function" ||
													key == "break" ||
													key == "continue" ||
													key == "debugger" ||
													key.indexOf(";")!=-1 ||
													key.indexOf("(")!=-1 ||
													key.indexOf(")")!=-1 ||
													key.indexOf("[")!=-1 ||
													key.indexOf("]")!=-1 ||
													key.indexOf(",")!=-1 ||
													key.indexOf("+")!=-1 ||
													key.indexOf("-")!=-1 ||
													key.indexOf("=")!=-1 ||
													key.indexOf("*")!=-1 ||
													key.indexOf("/")!=-1 ||
													key.indexOf("&")!=-1 ||
													key.indexOf("|")!=-1 ||
													key.indexOf("'")!=-1 ||
													key.indexOf("\"")!=-1 ||
													key.indexOf(".")!=-1 ||
													key.indexOf(":")!=-1 ||
													key.indexOf(" ")!=-1 ||
													key.indexOf("`")!=-1)
												)
												code.push(`
	// ${key}
	var ${key} = { 
		el : schema.el.${key}, 
		$ : schema.$.${key}, 
		conv : schema.conv.${key},
		schema : schema.schema.${key},
		exports : schema.exports.${key}
	};
												  `);
												  // import other namespace
												  
											}

											code.push(`
	schema = null;
	if(!("module" in this)) this.module = {};
	var module = this.module;
	this.module.exports = {};
	var exports = this.module.exports;
	// ------------------------------- begin--------------------------------------
	${value}
	// ---------------------------------end---------------------------------------
	
	//console.log("RUNNED",${JSON.stringify(value)});
}
`);
											code = code.join("");
											
											
											//console.log(code,options.context);
											
											try {
												eval(code);
												if(UI.Component.Debug.any) console.log("eval script",code);
												//console.log("sandbox1",sandbox1.toString());
											} catch(e) {
												console.error(value);
												console.error(code);
												console.error(e);
											}
											try {
												
												//window.console.log(code);
												//console.log(History);

												
												let ret_async = null;
												if(options && "context" in options) {
													//console.log("OK1 IN SCRIPT EVAL",ret_async,options.context,ret,value,sandbox1);
													//this.module = { exports : {} };
													//console.log(options.context,value);
													ret_async =  sandbox1.apply(options.context,[ret,value,self]);
												} else {
													//console.log("OK3");
													ret_async = sandbox1(ret,pattern,self);
													//console.log("OK4");
												}
												if(options && "context" in options) {
													//console.log("W CONTEXT",ret);
												} else {
													//console.log("WOUT CONTEXT",ret);
												}
												
												await ret_async;
											} catch (e) {
												console.log(code);
												console.log(e);
												throw e;
											}
											//console.log("after script eval",value);
											//pel.appendChild( document.createTextNode(""+value));	
										}
									} else {
										pel.appendChild(document.createTextNode("" + value));
										// if(pointer.length==2) options.originalParent.emit("appendchild",[{},pointer.length]);
									}
								} else {
									if (has_src) {
										// load file from localStorage
										var data = localStorage.getItem(src);
										var el = pointer[pointer.length - 1].container.elementPush(id, "span").el;
										el.appendChild(document.createTextNode("" + value));
										//options.originalParent.emit("appendchild",[{el},pointer.length]);
										
									} else {
										if( (""+value).trim() == "" ) {

										} else {
											var el = pointer[pointer.length - 1].container.elementPush(id, "span").el;
											el.appendChild(document.createTextNode("" + value));
											//options.originalParent.emit("appendchild",[{el},pointer.length]);
											
										}
									}
								}
							}
						} else {
							var el = pointer[pointer.length - 1].container.elementPush(id, tag.tagName).el;
							var iv = self.varGet(id);

							var convert_id = id;
							var direct = false;

							var toremove = [];
							var elc = pointer[pointer.length - 1].container.elementGetContents(id);
							if (!check) {
								convert_id = el ? el.getAttribute("id") : elc.getAttribute(id);
								direct = true;
							}
							if (check) {
								ret.el[id] = el;
								ret.$[id] = elc;
								if (options && options.context) {
									options.context[id] = { el: el, $: elc };
								}
								ret.conv[id] = el ? el.getAttribute("id") : elc.getAttribute(id);
							}
							var skip = false;
							for (var x = 0; x < tag.attributes.length; x++) {
								skip = false;
								//console.log("SOLE TAG",tag.tagName);
								var t = tag.attributes[x];
								if ((!skip) && (t.name != "id")) {
									if (t.value.charAt(0) == "\"" && t.value.charAt(t.value.length - 1) == "\"") {
										t.value = t.value.substring(1, t.value.length - 1);
									}



									el ? el.setAttribute(t.name, t.value) : elc.setAttribute(t.name, t.value);
								}
							}
							if (!check) {
								count += 1;
							}

							if(pointer.length==2 || true) {
								var n = {$:elc};
								if(el) n.el = el;
								// add removechild

								await options.originalParent.emit("appendchild",[ 
									n, {$:options.originalParent,exports:options.originalParent.elementGetInterceptExports()},
									pointer.length
								]);	
							}

						}
					} else {
						stack.push(tag);
						var id = "";
						var check = false;
						for (var x = 0; x < tag.attributes.length; x++) {
							if (tag.attributes[x].name == "id") {
								check = true;
								if (tag.attributes[x].value == "") throw "tag with identification must have a name";
								id += tag.attributes[x].value;
								break;
							}
						}
						if (!check) {
							id += "_" + count;
						}

						var el_tag = tag.tagName;
						if(tag.tagName.indexOf("Template")==0) {
							el_tag = "Template";
						}
						var pel = pointer[pointer.length - 1].container.elementPush(id,el_tag);
						//console.log(">>>>>>@@",id);
						var el = pel.el;
						var iv = self.varGet(id);

						var convert_id = id;
						var direct = false;
						var elc = pointer[pointer.length - 1].container.elementGetContents(id);
						el ? null : elc.setAttribute("tag", el_tag);
						pointer.push({
							element: el,
							container: elc
						});
						if (check) {
							//console.log("##",id);
							ret.el[id] = el;
							ret.$[id] = elc;
							ret.conv[id] = el ? el.getAttribute("id") : elc.getAttribute("id");
							if (options && options.context) {
								options.context[id] = { el: el, $: elc };
							}
						}
						var props = {};
						var propsOrder = {};
						var set = {};
						for (var x = 0; x < tag.attributes.length; x++) {
							var t = tag.attributes[x];
							try {
								if(t.name in propsOrder) {
									propsOrder[t.name].push(t.index);
									if(set[t.name]==1) {
										props[t.name] = [ props[t.name] ];
									}
									props[t.name].push(t.value);
									set[t.name] += 1;
								} else {
									propsOrder[t.name] = [t.index];
									props[t.name] = t.value;
									set[t.name] = 1;
								}
								// propsOrder[t.name] = t.index; // doesnt work here cause names are not ordered, names are replaced.
							} catch (e) {
							}
						}
						var _path_sentence = function(aw) {
							var arr = [];
							for(var x = 0; x < aw.length;x++)  { if(aw[x] in this.propsOrder) { for(var y = 0; y < this.propsOrder[aw[x]].length;y++) { arr.push([this.propsOrder[ aw[x] ][y],aw[x]]); } } }
							arr.sort((a,b)=>{ if(a[0] < b[0]) return -1; if(a[0] == b[0]) return 0; return 1; })
							var sentence = [];
							for(var x = 0; x < arr.length;x++) { sentence.push(arr[x][1]); }
							return sentence;
						}

						if(elc) {
							elc.elementSetProperties(props);
							elc.elementSetPropertiesOrder(propsOrder);
						}
						//console.error("M1:",tag);
						var skip = false;
						for (var x = 0; x < tag.attributes.length; x++) {
							skip = false;

							var t = tag.attributes[x];
							// this feature has backend dependencies.
							if (tag.tagName == "Component" && t.name == "src") {
								await (async () => {
									//console.log("EVAL COMPONENT SRC", t.value);
									var data = null;
									if(!(t.value in ComponentCache)) {
										data = await new Promise((resolve, reject) => {
											try {
												
												Import({ method: "GET", url: t.value })
													.done(async (data) => {
														//console.log("EVAL COMPONENT SRC", data);
														ComponentCache[t.value] = data;
														resolve(data);
														
													})
													.fail((e) => {
														alert("error 2:" + e);
														reject();
													})
													.send();
											} catch (e) {
												alert("error 1:" + e);
											}
										}); 
									} else {
										data = ComponentCache[t.value];
									}
									var context = { 
										module: { exports: {} }, 
										props: props,
										propsOrder : propsOrder,
										sentence : _path_sentence,
										children : function(str) {
											if(str==undefined) str = "";
											return "<Component id='$childrenTarget'>"+str+"</Component>";
										}
									};
									if (options && "context" in options && "bind" in props && (props.bind===true || props.bind == "true")) {
										context.parent = options.context;
									} else {
										context.parent = null;
									}
									//console.log(">>OK LOADED DYNAMIC COMPONENT ASYNC", code);
									//eval(code);
									//console.log(data);
									var schema = await elc.elementSetPacketAsync(data, { context: context });
									elc.setAttribute("original",options.originalParent);

									var _set_onappendchild = (parent) => {
										parent.on("appendchild",context.module.exports["@appendchild"]);
										parent.elementSetInterceptExports(context.module.exports);
									};
									if("@appendchild" in context.module.exports) {
										if("$childrenTarget" in schema.$) {
											_set_onappendchild(schema.$["$childrenTarget"]);
										}
										if("@childs" in context.module.exports) {
											for(var x = 0; x < context.module.exports["@childs"].length;x++) {
												_set_onappendchild(
													"selectedChild" in schema.$[ context.module.exports["@childs"][x] ].internal.Component ? 
													schema .$[ context.module.exports["@childs"][x] ].internal.Component.selectedChild : 
													schema.$[ context.module.exports["@childs"][x] ]
												)
											}
										}
									}
									var _set_onremovechild = (_parent) => {
										_parent.on("appendchild",(node,parent) => {
											node.$.setAttribute("removechild",true);
											node.$.setAttribute("original",options.originalParent);
											node.$.setAttribute("childParent",_parent);
											return true;
										});
										_parent.on("removechild",context.module.exports["@removechild"]);
										_parent.elementSetInterceptExports(context.module.exports);
									};
									if("@removechild" in context.module.exports) {
										if("$childrenTarget" in schema.$) {
											_set_onremovechild(schema.$["$childrenTarget"]);
										}
										if("@childs" in context.module.exports) {
											for(var x = 0; x < context.module.exports["@childs"].length;x++) {
												_set_onremovechild(
													"selectedChild" in schema.$[ context.module.exports["@childs"][x] ].internal.Component ? 
													schema .$[ context.module.exports["@childs"][x] ].internal.Component.selectedChild : 
													schema.$[ context.module.exports["@childs"][x] ]
												)
											}
										}
									}
									//console.log(">>OK LOADED DYNAMIC COMPONENT CONTEXT ASYNC",data);
									ret.exports[id] = context.module.exports;
									elc.elementSetExports(context.module.exports);
									ret.schema[id] = schema;
									elc.elementSetSchema(schema);
									if(options && options.context && check) {
										options.context[id].exports = context.module.exports;
										options.context[id].schema = schema;
									}
									tag.isCustom = true;
									tag.data = {
										component : elc,
										schema : schema
									}
									
								})();
								//console.log("after component src eval");
							} else if(tag.tagName == "Component" && t.name == "srcData") {
								await (async () => {
									//console.log("EVAL COMPONENT SRC", t.value);
									var data = t.value;
									var context = { 
										module: { exports: {} }, 
										props: props,
										propsOrder : propsOrder,
										sentence : _path_sentence,
										children : function(str) {
											if(str==undefined) str = "";
											return "<Component id='$childrenTarget'>"+str+"</Component>";
										}
									};
									if (options && "context" in options && "bind" in props && (props.bind===true || props.bind ==="true")) {
										context.parent = options.context;
									} else {
										context.parent = null;
									}
									//console.log(">>OK LOADED DYNAMIC COMPONENT ASYNC", code);
									//eval(code);
									//console.log(data);
									var schema = await elc.elementSetPacketAsync(data, { context: context });
									elc.setAttribute("original",options.originalParent);
									var _set_onappendchild = (parent) => {
										parent.on("appendchild",context.module.exports["@appendchild"]);
										parent.elementSetInterceptExports(context.module.exports);
									};
									if("@appendchild" in context.module.exports) {
										if("$childrenTarget" in schema.$) {
											_set_onappendchild(schema.$["$childrenTarget"]);
										}
										if("@childs" in context.module.exports) {
											for(var x = 0; x < context.module.exports["@childs"].length;x++) {
												_set_onappendchild(
													"selectedChild" in schema.$[ context.module.exports["@childs"][x] ].internal.Component ?
													schema.$[ context.module.exports["@childs"][x] ].internal.Component.selectedChild :
													schema.$[ context.module.exports["@childs"][x] ]
												);
											}
										}
									}
									var _set_onremovechild = (_parent) => {
										_parent.on("appendchild",function(node,parent) {
											node.$.setAttribute("removechild",true);
											node.$.setAttribute("original",options.originalParent);
											node.$.setAttribute("childParent",_parent);
											return true;
										});
										_parent.on("removechild",context.module.exports["@removechild"]);
										_parent.elementSetInterceptExports(context.module.exports);
									};
									if("@removechild" in context.module.exports) {
										if("$childrenTarget" in schema.$) {
											_set_onremovechild(schema.$["$childrenTarget"]);
										}
										if("@childs" in context.module.exports) {
											for(var x = 0; x < context.module.exports["@childs"].length;x++) {
												_set_onremovechild(
													"selectedChild" in schema.$[ context.module.exports["@childs"][x] ].internal.Component ?
													schema.$[ context.module.exports["@childs"][x] ].internal.Component.selectedChild : 
													schema.$[ context.module.exports["@childs"][x] ]
												)
											}
										}
									}
									//console.log(">>OK LOADED DYNAMIC COMPONENT CONTEXT ASYNC",data);
									ret.exports[id] = context.module.exports;
									elc.elementSetExports(context.module.exports);
									ret.schema[id] = schema;
									elc.elementSetSchema(schema);
									if(options && options.context && check) {
										options.context[id].exports = context.module.exports;
										options.context[id].schema = schema;
									}
									tag.isCustom = true;
									tag.data = {
										component : elc,
										schema : schema
									}
								})();
							}
							if (tag.tagName.toUpperCase() == "SCRIPT" && t.name.toLowerCase() == "src") {
								waitAsync = true;
								waitTarget = {
									el: el,
									$: elc,
									src: t.value,
									cond: el ? el.getAttribute("id") : elc.getAttribute("id"),
									loaded: false
								}
								el.setAttribute("data-normal", "true");
								//el.setAttribute("nomodule","nomodule");
								el.onload = function () {
									waitTarget.loaded = true;
								}
							} else if(tag.tagName.toUpperCase() == "SCRIPT" && t.name.toLowerCase() == "srcdata") {
								t.name = "src";
								//console.log("??",t.value);
								window.URL1 = URL.createObjectURL(new Blob([t.value], { type: 'text/javascript' }));
								t.value = window.URL1;
								waitAsync = true;
								waitTarget = {
									el: el,
									$: elc,
									src: t.value,
									cond: el ? el.getAttribute("id") : elc.getAttribute("id"),
									loaded: false
								}
								el.setAttribute("data-normal", "true");
								//el.setAttribute("type","module");
								el.onload = function () {
									waitTarget.loaded = true;
								}
								
							}

							//console.log(JSON.stringify(tag));
							if ((!skip) && t.name != "id") {

								if (Object.prototype.toString.apply(t.value) == "[object String]" && t.value.charAt(0) == "\"" && t.value.charAt(t.value.length - 1) == "\"") {
									t.value = t.value.substring(1, t.value.length - 1);
								}
								el ? el.setAttribute(t.name, t.value) : elc.setAttribute(t.name, t.value);
							}
							// undefined tagname is needing props
						}
						var _exports = null;
						if(check) {
							_exports = ret.exports[id];
						}
						await elc.emit("elementBuild",[options.context,(e1,s1)=>{
							//options.context[id].exports = e1;
							_exports = e1;
							if(check) {
								if(options && options.context) {
									options.context[id].exports = e1;
									options.context[id].schema = s1;
								}
								ret.exports[id] = e1; 
								ret.schema[id] = s1;
							}
							tag.isCustom = true;
							tag.data = {
								component : elc,
								schema : s1
							};
						}]); // setup exports of custom component.
						
						if(pointer.length==2 || true) {
							var n = {$:elc,exports: _exports};
							if(el) n.el = el;
							//ret.exports[id]
							// add remove child
							await options.originalParent.emit("appendchild",[
								n,
								{$:options.originalParent,exports:options.originalParent.elementGetInterceptExports()},
								pointer.length
							]);


						}
						
						if (!check) {
							count += 1;
						}
					}
				}
				if (waitAsync) {
					await new Promise((resolve, reject) => {
						console.log("WAITING SCRIPT");
						var loop = setInterval(function () {
							if (waitTarget.loaded) {
								console.log("LOADED SCRIPT : " + waitTarget.src);
								clearInterval(loop);
								resolve();
							}
						}, 10);
					});
				}
			}
			function clear_flags() {
				intag = false;
				attrib_count = 0;
				intagname = false;
				intagattrib = false;
				intagattrib_key = false;
				intagattrib_val = false;
				intagattrib_string = false;
				intagattrib_string2 = false;
			}
			if (Object.prototype.toString.apply(pattern) == "[object String]") {
				for (var x = 0; x < pattern.length; x++) {
					globalCharPos = x;
					var ch = pattern.charAt(x);
					//console.log(ch,DEBUG_COMPONENT_LEVEL);

					/*
					console.log(x,ch,pattern.substring(x),
						"intag",intag,
						"intagname",intagname,
						"intagattrib",intagattrib,
						"intagattrib_key",intagattrib_key,
						"intagattrib_val",intagattrib_val,
						"intagattrib_string",intagattrib_string
					);
					*/
					if(current) current.lastTextPos = x;
					if (!intag) {
						var checkHigh = false;
						var tag1 = null;
						var from = "";
						if (stack.length > 0) {
							tag1 = stack[stack.length - 1].tagName;
							var tag2 = tag1.toUpperCase()
							checkHigh = (tag2 == "SCRIPT" || tag2 == "PRE" || tag2 == "STYLE"|| tag2 == "TEXTAREA" || tag1.indexOf("Template") == 0);
							from = tag2;
						}
						if (ch == "<" && checkHigh) {
							var str2 = "</" + tag1 + ">";
							if (pattern.indexOf(str2, x) == x) {
								if (text != "") {
									current = { tagName: "text", endTag: false, soleTag: true, attributes: [{ name: "value", value: text, has_value: true }], from : from };
									clear_flags();
									await tag_handle(current);
									text = "";
								}
								current = { tagName: tag1, endTag: true, soleTag: false, attributes: [], lastTextPos : x + str2.length-1 };
								clear_flags();
								await tag_handle(current);
								x += (str2.length - 1);
								continue;
							} else {
								text += ch;
								continue;
							}
						} else if (ch == "<") {
							if (text != "") {
								current = { tagName: "text", endTag: false, soleTag: true, attributes: [{ name: "value", value: text, has_value: true }], from : from };
								clear_flags();
								await tag_handle(current);
							}
							if (pattern.indexOf("<!", x) == x) {
							} else if (pattern.indexOf("<!-", x) == x) {
							} else if (pattern.indexOf("<!--", x) == x) {
								var end = pattern.indexOf("-->");
								if (end != -1) x = end;
								else x = pattern.length;
								continue;
							} else if (pattern.indexOf("<![CDATA[", x) == x) {
								throw "CDATA not implemented.";
							} else {
								
								// find comments
								intag = true;
								intagname = true;
								intagattrib = false;
								while (x + 1 < pattern.length && (pattern.charAt(x + 1) == " " || pattern.charAt(x + 1) == "\t" || pattern.charAt(x + 1) == "\r" || pattern.charAt(x + 1) == "\n")) x += 1;
								if (x + 1 < pattern.length && pattern.charAt(x + 1) == "/") {
									//console.log("mark end tag",pattern.substring(x));
									x += 1;
									current = { tagName: "", endTag: true, soleTag: false, attributes: [] };
								} else {
									//console.log("mark tag start",pattern.substring(x));
									current = { tagName: "", endTag: false, soleTag: false, attributes: [] };
								}
							}
							text = "";
						} else if (ch == "{" && (stack.length > 0 && (()=>{
							//console.log(ch,pattern.substring(x,x+10));
							var last = stack.length-1;
							while(last>=0) {
								if( 
									stack[last].tagName.toLowerCase() == "script" || 
									// stack[last].tagName.toLowerCase() == "style"  ||
									stack[last].tagName.toLowerCase() == "pre" ||
									("isCustom" in stack[last] && stack[last].isCustom)
								) {
									//console.log("FALSE",pattern.substring(x,x+10));
									return false;
								}
								last--;
							}
							return true;
						 })() ) || (ch == "{" && stack.length == 0)) {

							// TODO: lazy macro {{{{ }}}} -> {{{ }}} -> {{ val }} -> val
							var count = 1;
							while(pattern.charAt(x+count) == "{") {
								count += 1;
							}

							// check for prints with js expression
							//console.log("not in tag");
							var backup = x;
							var data = null, script = null, target = null;

							if(count>2) {
								x += count-2;
								
							}

							//console.log(esprima);
							//throw new Error();
							var parsed_complex = false;
							
							try {
								var xorig = x;
								if(!options.runMacro) throw new Error("not allowed macros.");

								var code = pattern.substring(x+2);
								parser = new esprima.Parser(code,{loc:true});
								// keywords:
								// parseExpression
								function parseMemberExpression() {
									this.context.await = true;
									var node = this.createNode();
									var body = [];
									if (this.lookahead.type !== 2 ) { // EOF
										body = [this.parseAssignmentExpression()];
									}
									return this.finalize(node, body);
								};
								var data2 = parseMemberExpression.apply(parser);
								
								var script = code.substring(0,data2.loc.end.index);
								x += data2.loc.end.index+2;
								while (
									x < pattern.length && 
									(
										pattern.charAt(x) == " " || 
										pattern.charAt(x) == "\t" || 
										pattern.charAt(x) == "\r" || 
										pattern.charAt(x) == "\n"
									)
								) x += 1;
								if(pattern.charAt(x)=="}") {
									x++;
								} else throw new Error("expected '}'");
								if(pattern.charAt(x)=="}") {
									x++;
								} else throw new Error("expected '}'");

								if(count>2) {
									while(count > 2) {
										if( pattern.charAt(x) == "}" ) {
											count--;
											x++;
										} else {
											throw new Error("expected '}'");
										}
									}
									var tmp = pattern.split("");
									
									target = pattern.substring(backup+1,x-1);
									tmp.splice(backup,x-backup,target);
									text += target;
									x = backup + target.length;
									
									pattern = tmp.join("");
									
									parsed_complex = true;

								} else {
									//console.log(pattern.charAt(x));
									//console.log(pattern.substring(x));

									eval(`
										async function setAttrib1() {
											target = ` + script + `;
										}
										`
									);
									await setAttrib1.apply(options.context,[]);

									var t = Object.prototype.toString.apply(target);
									
									if (t == "[object String]" || t == "[object Number]") {
										//console.log("<STRING>",t,target);
										var tmp = pattern.split("");
										//console.error(pattern.substring(xorig,x));
										//tmp.splice(xorig, x+1-xorig, ""+target);
										tmp.splice(xorig,x-xorig,""+target);
										pattern = tmp.join("");
										x = xorig -1;
										//console.error(pattern.substring(x,x+10));
										parsed_complex = true;
									} else if (t == "[object Array]") {
										var tmp = pattern.split("");
										//tmp.splice(x + 1, 0, "" + target.join(""));
										//console.error( tmp.splice(xorig, x-xorig, ""+target.join("")),target.join("") );
										pattern = tmp.join("");
										x = xorig -1;
										//console.log("B", pattern);
										//console.log(pattern.substring(x + 1));
										parsed_complex = true;
									} else if (t == "[object Function]") {
										var tmp = pattern.split("");
										var target2 = target();
										var t2 = Object.prototype.toString.apply(target2);
										if(t2 == "[object String]" || t2 == "[object Number]") {
										} else if(t2 == "[object Array]") {
											target2 = target2.join("");
										} else {
											throw new Error("function does not return string or number");
										}
										tmp.splice(xorig, x-xorig, ""+target2);
										pattern = tmp.join("");
										x = xorig -1;
										parsed_complex = true;
									} else if(t == "[object AsyncFunction]") {
										var tmp = pattern.split("");
										var target2 = await target();
										var t2 = Object.prototype.toString.apply(target2);
										if(t2 == "[object String]" || t2 == "[object Number]") {
											
										} else if(t2 == "[object Array]") {
											target2 = target2.join("");
										} else {
											throw new Error("function does not return string or number");
										}
										tmp.splice(xorig, x-xorig, ""+target2);
										pattern = tmp.join("");
										x = xorig -1;
										parsed_complex = true;

									} else {

										console.log("<COMPONENT>",t,target);

										parsed_complex = false;
										throw new Error(target);
									}
								}

							} catch(e) {
								if(e.message.indexOf("not defined")!=-1 && window.Vue) {} else {
									//console.error(e);
									x = backup;
								}
							}
							
							if(!parsed_complex) {
								try {
									if(!options.runMacro) throw new Error("not allowed macros.");
									data = JsExpression.parse(pattern.substring(x));
									var xorig = x;
									x = pattern.length - data[1].length - 1;
									script = data[0];
									//console.log(">>",stack[stack.length - 1].tagName.toLowerCase(),script,pattern);
									target = null;
									//console.log(">>0",options.context);
									eval(`
										async function setAttrib1() {
											target = ` + script + `;
										}
										`
									);
									await setAttrib1.apply(options.context,[]);
									//console.log(">>M",target,script);
									var t = Object.prototype.toString.apply(target);
									if (t == "[object String]" || t == "[object Number]") {
										// and if it is the html <Component> string or other html?
										//console.log("TARGET",target);
										var tmp = pattern.split("");

										//console.log("PREPATTERN",pattern.substring(xorig,x+1));
										//tmp.splice(x + 1, 0, "" + target);
										tmp.splice(xorig, x+1-xorig, ""+target);
										pattern = tmp.join("");
										x = xorig -1;
										//console.log("PATTERN", pattern);
										//console.log(x);
										//console.log(pattern.substring(x + 1));
									} else if (t == "[object Array]") {
										var tmp = pattern.split("");
										//tmp.splice(x + 1, 0, "" + target.join(""));
										tmp.splice(xorig, x+1-xorig, ""+target.join(""));
										pattern = tmp.join("");
										x = xorig -1;
										//console.log("B", pattern);
										//console.log(pattern.substring(x + 1));
									} else {
										var tmp = pattern.split("");
										//tmp.splice(x + 1, 0, "[object Object]");
										tmp.splice(xorig, x+1-xorig, ""+target);
										pattern = tmp.join("");
										x = xorig -1;
										//console.log("C", pattern);
										//console.log(pattern.substring(x + 1));
									}
								} catch (e) {
									if (e.message == "Expected \"{{\" but \"{\" found.") {
										//console.log("not replace tag");
										//console.log(pattern.substring(x,x+20));
										x = backup;
										text += ch;
									} else if(e.message =="not allowed macros.") {
										text += ch;
										x = backup;
									} else {
										if(window.Vue) {

										} else {
											console.error(e.message);
											//console.log("?1data", data);
											//console.log("?2script", script);
											//console.log("?3target", target);
											//console.error(e);

										}
										text += ch;
										x = backup;
										//throw "FAIL2";
									} 
								}
							}
						} else {
							//console.log(ch);
							text += ch;
						}
					} else {
						if (intagname) {
							if (ch == "/") {
								while (x + 1 < pattern.length && (pattern.charCodeAt(x + 1) == " " || pattern.charCodeAt(x + 1) == "\t" || pattern.charCodeAt(x + 1) == "\r" || pattern.charCodeAt(x + 1) == "\n")) x += 1;
								if (x + 1 < pattern.length && pattern.charAt(x + 1) == ">") {
									clear_flags(); current.soleTag = true;
									await tag_handle(current);
									x++;
								} else {
									//console.log(x,pattern.substring(x));
									throw "unexpected tag end";
								}
							} else if (ch == ">") {
								clear_flags();
								// mark begin of inner text
								if(!current.soleTag && !current.endTag) current.beginInnerText = x+1;
								await tag_handle(current);
							} else if (ch == " " || ch == "\t" || ch == "\r" || ch == "\n") {
								intagname = false;
								intagattrib = false;
							} else {
								current.tagName += ch;
							}
						} else if (intagattrib) {
							if (intagattrib_key) {
								// check for spread {{ object }} to add fast props.
								if (ch == " " || ch == "\t" || ch == "\r" || ch == "\n") {
									intagattrib = false;
									current_attribute = null;
								} else if (ch == ">") {
									clear_flags();
									current.beginInnerText = x+1;
									await tag_handle(current);
								} else if (ch == "/") {
									while (x + 1 < pattern.length && (pattern.charAt(x + 1) == " " || pattern.charAt(x + 1) == "\t" || pattern.charAt(x + 1) == "\r" || pattern.charCodeAt(x + 1) == "\n")) x += 1;
									if (x + 1 < pattern.length && pattern.charAt(x + 1) == ">") {
										clear_flags(); current.soleTag = true;
										await tag_handle(current);
										x++;
									} else throw "unexpected tag end";
								} else if (ch == "=") {
									if (x + 1 < pattern.length && pattern.charAt(x + 1) == "{") {
										try {
											var xorig = x;
											x+=1;
											if(pattern.charAt(x)=="{") {
												x++;
											} else throw new Error("expected '{'");
											if(pattern.charAt(x)=="{") {
												x++;
											} else throw new Error("expected '{'");
											
											var code = pattern.substring(x);
											//console.error(code);
											parser = new esprima.Parser(code,{loc:true});
											// keywords:
											// parseExpression
											function parseMemberExpression2() {
												this.context.await = true;
												var node = this.createNode();
												var body = [];
												if (this.lookahead.type !== 2 ) { // EOF
													body = [this.parseAssignmentExpression()];
												}
												return this.finalize(node, body);
											};
											var data2 = parseMemberExpression2.apply(parser);
											//console.error( data2,code.substring(data2.loc.start.index,data2.loc.end.index) );
											var script = code.substring(0,data2.loc.end.index);
											x += data2.loc.end.index;

											while (
												x < pattern.length && 
												(
													pattern.charAt(x) == " " || 
													pattern.charAt(x) == "\t" || 
													pattern.charAt(x) == "\r" || 
													pattern.charAt(x) == "\n"
												)
											) x += 1;
											if(pattern.charAt(x)=="}") {
												x++;
											} else throw new Error("expected '}'");
											if(pattern.charAt(x)=="}") {
												x++;
											} else throw new Error("expected '}'");

											/*
											var data = JsExpression.parse(pattern.substring(x + 1));
											x = pattern.length - data[1].length - 1;
											var script = data[0];
											*/
											
											
											var code = `
											  async function setAttrib1(schema) {
												  `+(()=>{
													  	var sb = [];
														for(var key in ret.el) {
															if(!(
																key == "this" ||
																key == "if" ||
																key == "class" ||
																key == "extends" ||
																key == "import" ||
																key == "else" ||
																key == "var" ||
																key == "let" ||
																key == "await" ||
																key == "return" ||
																key == "do" ||
																key == "while" ||
																key == "for" ||
																key == "function" ||
																key == "break" ||
																key == "continue" ||
																key == "debugger" ||
																key.indexOf(";")!=-1 ||
																key.indexOf("(")!=-1 ||
																key.indexOf(")")!=-1 ||
																key.indexOf("[")!=-1 ||
																key.indexOf("]")!=-1 ||
																key.indexOf(",")!=-1 ||
																key.indexOf("+")!=-1 ||
																key.indexOf("-")!=-1 ||
																key.indexOf("=")!=-1 ||
																key.indexOf("*")!=-1 ||
																key.indexOf("/")!=-1 ||
																key.indexOf("&")!=-1 ||
																key.indexOf("|")!=-1 ||
																key.indexOf("'")!=-1 ||
																key.indexOf("\"")!=-1 ||
																key.indexOf(".")!=-1 ||
																key.indexOf(":")!=-1 ||
																key.indexOf(" ")!=-1 ||
																key.indexOf("`")!=-1)
															) sb.push(`
															var ${key} = { 
																el : schema.el.${key}, 
																$ : schema.$.${key}, 
																conv : schema.conv.${key},
																schema : schema.schema.${key},
																exports : schema.exports.${key}
															};
															`);
														}
														
														return sb.join("\n");
												  })()+
												`
												  try { // executa um monte de vezes por causa do children, mas so a ultima passagem possui o valor desejado
													  current_attribute.value = ` + script + `;
												  } catch(e) {

												  }
											  }
											  `;
											x--;
											//console.log(code,pattern.substring(x));
											eval(code);
											await setAttrib1.apply(options.context,[ret]);
											current_attribute = null;
											intagattrib = false;
											intagattrib_key = false;
											intagattrib_val = false;
											intagattrib_string = false;
											intagattrib_string2 = false;
										} catch (e) {
											console.error(e);
											throw "FAIL2";
										}
									} else {
										intagattrib_key = false;
										intagattrib_val = true;
									}
								} else {
									current_attribute.name += ch;
								}

							} else if (intagattrib_val) {
								if (intagattrib_string) {
									if (ch == "\"") {
										current_attribute = null;
										intagattrib = false;
										intagattrib_key = false;
										intagattrib_val = false;
										intagattrib_string = false;
									} else {
										current_attribute.has_value = true;
										current_attribute.value += ch;
									}
								} else if (intagattrib_string2) {
									if (ch == "'") {
										current_attribute = null;
										intagattrib = false;
										intagattrib_key = false;
										intagattrib_val = false;
										intagattrib_string2 = false;
									} else {
										current_attribute.has_value = true;
										current_attribute.value += ch;
									}
								} else {
									if (current_attribute.value == "" && ch == "\"") {
										intagattrib_string = true;
									} else if (current_attribute.value == "" && ch == "'") {
										intagattrib_string2 = true;
									} else if (ch == "/") {
										while (x + 1 < pattern.length && (pattern.charCodeAt(x + 1) == " " || pattern.charCodeAt(x + 1) == "\t" || pattern.charCodeAt(x + 1) == "\r" || pattern.charCodeAt(x + 1) == "\n")) x += 1;
										if (x + 1 < pattern.length && pattern.charAt(x + 1) == ">") {
											clear_flags(); current.soleTag = true;
											await tag_handle(current);
											x++;
										} else throw "unexpected tag end";
									} else if (ch == ">") {
										clear_flags();
										current.beginInnerText = x+1;
										await tag_handle(current);
									} else if (ch != " ") {
										current_attribute.has_value = true;
										current_attribute.value += ch;
									} else {
										intagattrib = false;
										intagattrib_key = false;
										intagattrib_val = false;
										intagattrib_string = false;
										current_attribute = null;
									}
								}
							} else {
								while ((pattern.charAt(x) == " " || pattern.charAt(x) == "\t" || pattern.charAt(x) == "\r" || pattern.charAt(x) == "\n") && x < pattern.length) x += 1;
								if (x == pattern.length) throw "unexpected tag end";
								ch = pattern.charAt(x);
								if (ch == "/") {
									while (x + 1 < pattern.length && (pattern.charCodeAt(x + 1) == " " || pattern.charCodeAt(x + 1) == "\t" || pattern.charCodeAt(x + 1) == "\r" || pattern.charCodeAt(x + 1) == "\n")) x += 1;
									if (x + 1 < pattern.length && pattern.charAt(x + 1) == ">") {
										clear_flags(); current.soleTag = true;
										await tag_handle(current);
										x++;
									} else {
										throw "unexpected tag end";
									}
								} else if (ch == ">") {
									clear_flags();
									current.beginInnerText = x+1;
									await tag_handle(current);
								} else {
									intagattrib = true;
									intagattrib_key = true;
									intagattrib_val = false;
									var attrib = {};
									attrib.name = ch;
									attrib.value = "";
									// number words

									attrib.has_value = false;
									attrib.index = attrib_count++;
									current.attributes.push(attrib);
									current_attribute = attrib;
								}
							}
						} else {
							if (ch == " " || ch == "\t" || ch == "\n" || ch == "\r") {
								continue;
							}  else if (ch == "/") { // sole tag
								while (x + 1 < pattern.length && (pattern.charCodeAt(x + 1) == " " || pattern.charCodeAt(x + 1) == "\t" || pattern.charCodeAt(x + 1) == "\r" || pattern.charCodeAt(x + 1) == "\n")) x += 1;
								if (x + 1 < pattern.length && pattern.charAt(x + 1) == ">") {
									clear_flags(); current.soleTag = true;
									await tag_handle(current);
									x++;
								} else {
									throw "unexpected tag end";
								}
							} else if (ch == ">") {
								clear_flags();
								current.beginInnerText = x+1;
								await tag_handle(current);
							} else { // attrib init , check for spread props.
								
								intagname = false;
								intagattrib = true;
								intagattrib_key = true;
								intagattrib_val = false;
								var attrib = {};
								attrib.has_value = false;
								attrib.name = ch;
								attrib.value = "";
								// number words
								attrib.index = attrib_count++;
								current.attributes.push(attrib);
								current_attribute = attrib;
								
							}
						}
					}
				}
				if (text != "") {
					//text = text.split("\r").join("").split("\n").join(" ");
					current = { tagName: "text", endTag: false, soleTag: true, attributes: [{ name: "value", value: text, has_value: true }] };
					clear_flags();
					await tag_handle(current);
				}
			}
			DEBUG_COMPONENT_LEVEL--;
			if("$childrenTarget" in ret.$) self.internal.Component.selectedChild = ret.$.$childrenTarget;

			newPacketAsync_stack--;

			return ret;
		}
		this.elementPushPacketAsync = async function () {
			if("selectedChild" in self.internal.Component) {
				if(arguments.length==1) {
					return self.internal.Component.selectedChild.elementPushPacketAsync.apply(self.internal.Component.selectedChild,
						[arguments[0]]
					);
				} else if(arguments.length==2) {
					return self.internal.Component.selectedChild.elementPushPacketAsync.apply(self.internal.Component.selectedChild,
						[arguments[0],arguments[1]]
					);
				} else {
					throw new Error("@elementPushPacketAsync, invalid number of arguments.");
				}
			}
			var parent;
			if (arguments.length == 1) { // doc
				parent = this.elementPush("Component");
				return await newPacketAsync(parent.$, arguments[0], { originalParent : self });
			} else if (arguments.length == 2) { // name,doc
				if (
					Object.prototype.toString.apply(arguments[1]) == "[object Object]" &&
					Object.prototype.toString.apply(arguments[0]) == "[object String]"
				) {
					parent = this.elementPush("Component");
					arguments[1].originalParent = self;
					return await newPacketAsync(parent.$, arguments[0], arguments[1]);
				} else {
					parent = this.elementPush(arguments[0], "Component");
					return await newPacketAsync(parent.$, arguments[1], {originalParent : self });
				}
			}
		};
		this.elementUnshiftPacketAsync = async function () {
			if("selectedChild" in self.internal.Component) {
				if(arguments.length==1) {
					return self.internal.Component.selectedChild.elementUnshiftPacketAsync.apply(self.internal.Component.selectedChild,
						[arguments[0]]
					);
				} else if(arguments.length==2) {
					return self.internal.Component.selectedChild.elementUnshiftPacketAsync.apply(self.internal.Component.selectedChild,
						[arguments[0],arguments[1]]
					);
				} else {
					throw new Error("@elementPushPacketAsync, invalid number of arguments.");
				}
			}
			var parent;
			if (arguments.length == 1) {
				parent = this.elementUnshift("Component");
				return await newPacketAsync(parent.$, arguments[0], {originalParent : self });
			} else if (arguments.length == 2) {
				if (
					Object.prototype.toString.apply(arguments[1]) == "[object Object]" &&
					Object.prototype.toString.apply(arguments[0]) == "[object String]"
				) {
					parent = this.elementUnshift("Component");
					arguments[1].originalParent = self;
					return await newPacketAsync(parent.$, arguments[0], arguments[1]);
				} else {
					parent = this.elementUnshift(arguments[0], "Component");

					return await newPacketAsync(parent.$, arguments[1],{originalParent : self});
				}
			}
		};
		
		this.elementMovePrior = async function() {
			throw new Error("WIP");
			//console.log( this.internal.WithDOMNode );
			var self = this;
			if(this.internal.WithDOMNode.parent_component) {
				
				var stack = [
					[ this.internal.WithDOMNode.parent_component, 0 ]
				];
				var A = null, B = null, C = null, D = null;
				while(stack.length>0) {
					//console.log(1);
					var item = stack.pop();
					if( item[1] < item[0].itemAmount()) {
						var target = item[0].itemGetAt(item[1]);
						//console.log(">>?",target);
						if(target.tag == "complex_element") {
							//target.complex
							stack.push([item[0], item[1]+1]);
							//stack.push([target.complex,0]);
							A = B;
							B = C;
							C = {
								target : target,
								item : target.complex,
								parent : item[0],
								at : item[1]
							};
							if(target.complex == self) {
								//console.log("FOUND!");
								if(item[1]+1 < item[0].itemAmount()) {
									D = {
										target : item[0].itemGetAt(item[1]+1),
										parent : item[0],
										at : item[1]+1
									};
									D.item = D.target.tag == "complex_element" ? D.target.complex : D.target.component;
								}
								
								break;
							}
							D = null;
							continue;
						} else {

							stack.push([item[0], item[1]+1]);
							//stack.push([target.component,0]);
							
							A = B;
							B = C;
							C = {
								target : target,
								item : target.component,
								parent : item[0],
								at : item[1]
							};
							if(target.component == self) {
								//console.log("FOUND!");
								if(item[1]+1 < item[0].itemAmount()) {
									D = {
										target : item[0].itemGetAt(item[1]+1),
										parent : item[0],
										at : item[1]+1
									};
									D.item = D.target.tag == "complex_element" ? D.target.complex : D.target.component;
								}
								break;
							}
							D = null;
							continue;
						}
					}
					//find_pattern_find_callback()
				}
				//console.log("A",A);
				//console.log("B",B);
				//console.log("C",C);
				var listOfC = [];
				if(C.target.tag == "complex_element") {
					// make a list of insertions
					var stack = [[C.item, 0]];
					while(stack.length>0) {
						var item = stack.pop();
						if(item[1] < item[0].itemAmount()) {
							var target = item[0].itemGetAt(item[1]);
							stack.push([ item[0], item[1]+1 ]);
							if(target.tag == "complex_element") {
								stack.push([ target.complex, 0 ]);
							} else {
								listOfC.push(target.el);
							}
						}
					}
				} else {
					listOfC.push(C.target.el);
				}
				if(B != null) { // put C before B
					if(B.target.tag == "complex_element") {
						//throw new Error("WIP Remount TODO")
						// find first concrete of B.
						var B1_parent = null;
						var p = null;
						var stack = [ [B.item ,0] ];
						while(stack.length>0) {
							var item = stack.pop();
							if(item[1] < item[0].itemAmount()) {
								var target = item[0].itemGetAt(item[1]);
								if(target.tag == "complex_element") {
									stack.push([ item[0], item[1] + 1]);
									stack.push([ target.complex, 0 ]);
								} else { // found
									B1_parent = target.el.parentNode;
									p = target.el;
									break;
								}
							}
						}
						// if not found, complex is empty so just change on internal.array
						if(p!=null) {
							for(var x = listOfC.length-1;x>=0;x--) {
								B1_parent.insertBefore(listOfC[x],p);
								p = listOfC[x];
							}
						} else {
							// empty component
							//console.error("empty component");
						}
						var B_loc = B.parent.internal.WithArray.data[ B.at ];
						var C_loc = B.parent.internal.WithArray.data[ C.at ];
						B.parent.internal.WithArray.data[ B.at ] = C_loc;
						B.parent.internal.WithArray.data[ C.at ] = B_loc;
						
					} else {
						// both concrete
						console.log("target concrete, before concrete");
						var B_parent = B.target.el.parentNode;
						var p = B.target.el;
						for(var x = listOfC.length-1;x>=0;x--) {
							B_parent.insertBefore(listOfC[x],p);
							p = listOfC[x];
						}
						var B_loc = B.parent.internal.WithArray.data[ B.at ];
						var C_loc = B.parent.internal.WithArray.data[ C.at ];
						B.parent.internal.WithArray.data[ B.at ] = C_loc;
						B.parent.internal.WithArray.data[ C.at ] = B_loc;
						// must find first of D to insert A before
						//A_parent.appendChild(A.target.el);
					}
				} else { // on top of parent list, should move upper?
					throw new Error("outside parent.");
				}
				
			}
		};
		this.elementMoveLater = async function() {
			throw new Error("WIP");
			//console.log( this.internal.WithDOMNode );
			var self = this;
			if(this.internal.WithDOMNode.parent_component) {
				
				var stack = [
					[ this.internal.WithDOMNode.parent_component, 0 ]
				];
				var sel = null;
				var A = null, B = null, C = null, D = null;
				while(stack.length>0) {
					//console.log(1);
					var item = stack.pop();

					if( item[1] < item[0].itemAmount()) {
						var target = item[0].itemGetAt(item[1]);
						//console.log(">>?",target);
						if(target.tag == "complex_element") {
							//target.complex
							stack.push([item[0], item[1]+1]);
							//stack.push([target.complex,0]);
							A = B;
							B = C;
							C = {
								target : target,
								item : target.complex,
								parent : item[0],
								at : item[1]
							};
							if(target.complex == self) {
								//console.log("FOUND!");
								if(item[1]+1 < item[0].itemAmount()) {
									D = {
										target : item[0].itemGetAt(item[1]+1),
										parent : item[0],
										at : item[1]+1
									};
									D.item = D.target.tag == "complex_element" ? D.target.complex : D.target.component;
								}
								
								break;
							}
							D = null;
							continue;
						} else {

							stack.push([item[0], item[1]+1]);
							//stack.push([target.component,0]);
							
							A = B;
							B = C;
							C = {
								target : target,
								item : target.component,
								parent : item[0],
								at : item[1]
							};
							if(target.component == self) {
								//console.log("FOUND!");
								if(item[1]+1 < item[0].itemAmount()) {
									D = {
										target : item[0].itemGetAt(item[1]+1),
										parent : item[0],
										at : item[1]+1
									};
									D.item = D.target.tag == "complex_element" ? D.target.complex : D.target.component;
								}
								break;
							}
							D = null;
							continue;
						}
					}
					//find_pattern_find_callback()
				}
				//console.log("A",A);
				//console.log("B",B);
				//console.log("C",C);
				if(D != null) {
					//console.log("D",C);
					D.item.elementMovePrior();
				} else {
					throw new Error("outside parent.");
				}
			
			}
		};

	}
	, proto: {
		getAttribute: function (key) {
			if (key in this.internal.Component) {
				return this.internal.Component[key];
			}
			return null;
		},
		setAttribute: function (key, value) {
			this.internal.Component[key] = value;
		},
		elementPop: function () {
			if("selectedChild" in this.internal.Component) {
				return this.internal.Component.selectedChild.elementPop();
			}
			console.error("POP BEGIN",this,this.internal.WithArray.data[0],this.itemAmount());
			var p = this.itemPop();
			var names = this.varNamesByValue(p);
			if (names.length > 0) {
				for (var x = 0; x < names.length; x++) {
					this.varUnset(names[x]);
				}
			}
			console.error("POP END",this.itemAmount());
			return p;
		},
		elementShift: function () {
			if("selectedChild" in this.internal.Component) {
				return this.internal.Component.selectedChild.elementShift();
			}
			var p = this.itemShift();
			var names = this.varNamesByValue(p);
			if (names.length > 0) {
				for (var x = 0; x < names.length; x++) {
					this.varUnset(names[x]);
				}
			}
			return p;
		},
		elementSetPacketAsync: async function () { // = -> means replace
			var args = [];
			for (var x = 0; x < arguments.length; x++) args.push(arguments[x]);
			if("selectedChild" in this.internal.Component) {
				this.internal.Component.selectedChild.elementsClear();
				var ret1 = await this.internal.Component.selectedChild.elementPushPacketAsync.apply(this.internal.Component.selectedChild, args );
				this.internal.Component.selectedChild.elementSetSchema(ret);
				return ret1;
			}
			this.elementsClear();
			//console.log("ELEMENT SET PACKET ASYNC",args);
			var ret = await this.elementPushPacketAsync.apply(this, args);
			this.elementSetSchema(ret);
			return ret;
		},
		pp: async function() {
			var args = [];
			for(var x = 0; x < arguments.length;x++) args.push(arguments[x]);
			return this.elementPushPacketAsync.apply(this,args);
		},
		up: async function() {
			var args = [];
			for(var x = 0; x < arguments.length;x++) args.push(arguments[x]);
			return this.elementUnshiftPacketAsync.apply(this,args);
		},
		sp : async function() {
			var args = [];
			for(var x = 0; x < arguments.length;x++) args.push(arguments[x]);
			return this.elementSetPacketAsync.apply(this,args);
		},
		c : async function() {
			return this.elementsClear();
		},
		elementSetSchema : function(schema) {
			this.internal.Component.data.schema = schema;
		},
		elementGetSchema : function() {
			if("schema" in this.internal.Component.data) {
				return this.internal.Component.data.schema;
			} else {
				return null;
			}
		},
		elementSetPreChildren : function(children) {
			if(!("children" in this.internal.Component.data)) {
				this.internal.Component.data.children = children;
			}
		},
		elementGetPreChildren : function() {
			if("children" in this.internal.Component.data) {
				return this.internal.Component.data.children;
			} else {
				return null;
			}
		},
		elementReadChildrenText : function() {
			if("Component" in this.internal && "isPrimitive" in this.internal.Component && this.internal.Component.isPrimitive) {
				return this.elementGetPreChildren();
			} else {
				return this?.elementGetSchema()?.$?.$childrenTarget?.elementGetPreChildren();
			}
		},
		elementSetInterceptExports : function(exports) {
			this.internal.Component.data.intercept_exports = exports;
		},
		elementGetInterceptExports : function() {
			if("intercept_exports" in this.internal.Component.data) {
				return this.internal.Component.data.intercept_exports;
			} else {
				return null;
			}
		},
		elementSetExports : function(exports) {
			this.internal.Component.data.exports = exports;
		},
		elementGetExports : function() {
			if("exports" in this.internal.Component.data) {
				return this.internal.Component.data.exports;
			} else {
				return null;
			}
		},
		elementChildren : function() {
			var schema = this.elementGetSchema();
			if(schema==null) return this;
			if("$childrenTarget" in schema.$) {
				return schema.$.$childrenTarget;
			}
			return this;
		},
		elementSetProperties : function(props) {
			if(!("props" in this.internal.Component.data)) {
				this.internal.Component.data.props = props;
			}
		},
		elementGetProperties : function() {
			if("props" in this.internal.Component.data) {
				return this.internal.Component.data.props;
			} else {
				return null;
			}
		},
		elementSetPropertiesOrder : function(propsOrder) {
			if(!("propsOrder" in this.internal.Component.data)) {
				this.internal.Component.data.propsOrder = propsOrder;
			}
		},
		elementGetPropertiesOrder : function() {
			if("propsOrder" in this.internal.Component.data) {
				return this.internal.Component.data.propsOrder;
			} else {
				return null;
			}
		},
		elementRemove: function (name) {
			var itemA = this.varGet(name);
			//console.log("element remove called ",name,itemA.id);
			//console.log(itemA,name);

			this.itemRemoveComplex(function (x, itemB) {
				//console.log(itemA,itemB);
				return (itemB.id == itemA.id);
			});
			this.varUnset(name);
		},
		elementRename: function (oldname, newname) {
			var val = this.varGet(oldname);
			this.elementRemove(oldname);
			this.varSet(newname, val);
			this.itemPush(val);
		},
		elementIsComplex: function (name) {
			var ret = this.varGet(name);
			if (ret != null) {
				if (ret.tag == "complex_element") {
					return true;
				}
			}
			return false;
		},
		elementGetContents: function (name) {
			var ret = this.varGet(name);
			if (ret == null) return null;
			if (ret.tag == "complex_element") {
				return ret.complex;
			} else {
				return ret.component;
			}
		},
		elementGetRaw: function (name) {
			var ret = this.varGet(name);
			if (ret == null) return null;
			if (ret.tag == "complex_element") {
				throw "'" + name + "' element do not have raw. may have.";
			} else {
				return ret.el;
			}
		},
		elementsClear: function () {
			delete this.internal.Component.selectedChild;
			var items = this.itemClear();
			this.varClear();
			delete items;
		},
		elementAddEvent: function (name, event, callback) {
			var target = this.varGet(name);
			if (target != null) {
				if (target.tag != "complex_element") {
					target.el.addEventListener(event, callback);
					return true;
				} else {
					if ("WithEvents" in target.complex.internal) {
						target.complex.on(event, callback);
						return true;
					}
					return false;
				}
			}
			return false;
		},
		elementRemoveEvent: function (name, event, callback) {
			var target = this.varGet(name);
			if (target != null) {
				if (target.tag != "complex_element") {
					target.el.removeEventListener(event, callback);
					return true;
				} else {
					if ("WithEvents" in target.complex.internal) {
						target.complex.off(event, callback);
						return true;
					}
					return false;
				}
			}
		},
		elementLock: function () {
			this.on("itemInputFilter", this.internal.Component.default_itemInputFilter_lock);
		},
		elementUnlock: function () {
			this.off("itemInputFilter", this.internal.Component.default_itemInputFilter_lock);
		},
		elementRender: function (time) {
			return;
		}
	}
});

UI.Component.tagfyString("Template",`
	{{ this.children() }}
	<script>
		var obj = {};
		Object.defineProperty(obj,"value",{ get : ()=>{ return $childrenTarget.$.elementGetPreChildren(); } })
		module.exports = obj;
	</`+`script>
`);
UI.Component.tagfyString("Tagfy",`
	<script>
        UI.Component.tagfyString(this.props.name,this.props.source);
	</`+`script>
`);
UI.Component.tagfyString("Comment",``);

function _Struct_UIWindow() { }
_Struct_UIWindow.prototype.data = window;
_Struct_UIWindow.prototype.loaded = false;
_Struct_UIWindow.prototype.keyboard = {};

Class.define("UI.Window", {
	from: ["WithEvents"]
	, struct: _Struct_UIWindow
	, ctor: function () {

		var self = this.internal["UI.Window"];

		self.keyboard.enabled = true;
		self.keyboard.shift = false;
		self.keyboard.capslock = false;
		self.keyboard.alt = false;
		self.keyboard.ctrl = false;
		self.keyboard.keys = {};
		this.on("on", function (event, callback) {
			if (event == "load") {
				if (self.loaded) {
					callback();
				} else {
					self.data.addEventListener(event, callback);
				}
			} else {
				self.data.addEventListener(event, callback);
			}
			return true;
		});
		this.on("off", function (event, callback) {
			self.data.removeEventListener(event, callback);
			return true;
		});

		Object.defineProperty(this, "keyboard", {
			get: function () {
				return this.internal["UI.Window"].keyboard;
			}
		});
		var timer_ctrl = false;
		var timer_alt = false;
		var timer_shift = false;
		this.on("keydown", function (e) {
			//console.error("UI.Window.on('keydown',(keycode:",e.keyCode);
			self.keyboard.keys[e.keyCode] = true;
			if (e.keyCode == 16) {
				self.keyboard.shift = true;
				if (!timer_shift) {
					timer_shift = true;
					setTimeout(function () {
						timer_shift = false;
						self.keyboard.shift = false;
					}, 1000);
				}
			}
			if (e.keyCode == 17) {
				self.keyboard.ctrl = true;
				if (!timer_ctrl) {
					timer_ctrl = true;
					setTimeout(function () {
						timer_ctrl = false;
						//self.keyboard.ctrl = false;
					}, 1000);
				}
			}

			if( e.getModifierState(e.ctrlKey) ) {
			}

			if (e.keyCode == 18) {
				self.keyboard.alt = true;
				if (!timer_alt) {
					timer_alt = true;
					setTimeout(function () {
						timer_alt = false;
						self.keyboard.alt = false;
					}, 1000);
				}
			}
		});
		this.on("keyup", function (e) {
			//console.error("UI.Window.on('keyup',(keycode:",e.keyCode);
			self.keyboard.keys[e.keyCode] = false;
			if (e.keyCode == 16) {
				self.keyboard.shift = false;
			}
			if (e.keyCode == 17) {
				self.keyboard.ctrl = false;
			}
			if (e.keyCode == 18) {
				self.keyboard.alt = false;
			}
		});
		if ("onorientationchange" in window) {
			this.on("orientationchange", function () {
			}, false);
		}
	}
	, proto: {
		get: function () {

		},
		getStringSize: function (str, style) {
			var s = document.createElement("span");
			//s.style.position = "relative";
			s.style.visibility = "hidden";

			BrowserTools.setStyle(s, style);
			s.style.padding = "0px";
			s.style.margin = "0px";
			s.innerHTML = str;
			UI.Body.get().appendChild(s);

			var w = s.offsetWidth;
			var h = s.offsetHeight;

			UI.Body.get().removeChild(s);
			//getStringSize

			return [w, h];
		},
		copyToClipboard: function (text) {
			if (window.clipboardData && window.clipboardData.setData) {
				// IE specific code path to prevent textarea being shown while dialog is visible.
				return clipboardData.setData("Text", text);
			} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
				var textarea = document.createElement("textarea");
				textarea.textContent = text;
				textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
				document.body.appendChild(textarea);
				textarea.select();
				try {
					return document.execCommand("copy");  // Security exception may be thrown by some browsers.
				} catch (ex) {
					console.warn("Copy to clipboard failed.", ex);
					return false;
				} finally {
					document.body.removeChild(textarea);
				}
			}
		},
		getBounds: function () {
			var window_width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth,
				window_height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
			return [window_width, window_height];
		}
	}
});


Class.define("UI.Document", {
	from: ["WithEvents"]
	, ctor: function () {
		var self = this.internal["UI.Document"];
		self.data = document;

		this.on("on", function (event, callback) {
			//console.log("set visibility change event");
			self.data.addEventListener(event, callback);
			return true;
		});
		this.on("off", function (event, callback) {
			self.data.removeEventListener(event, callback);
			return true;
		});
		self.context_menu = true;
		self.cancel_context_menu = function (event) {
			event = event || window.event;
			if (event.stopPropagation)
				event.stopPropagation();
			console.log(event.button);
			event.cancelBubble = true;
			return false;
		}


	}
	, proto: {
		get: function () {
			var self = this.internal["UI.Document"];
			return self.data;
		},
		trackMouse: function () {

			var mousePos = {
				x: 0,
				y: 0
			};
			this.mouse = mousePos;
			document.onmousemove = function handleMouseMove(event) {
				var dot, eventDoc, doc, body, pageX, pageY;
				event = event || window.event; // IE-ism
				console.log("move");
				if (event.pageX == null && event.clientX != null) {
					eventDoc = (event.target && event.target.ownerDocument) || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}
				console.log(event.pageX, event.pageY);
				mousePos = {
					x: event.pageX,
					y: event.pageY
				};
			}


		},
		defaultContextMenu: function () {
			var self = this.internal["UI.Document"];
			if (arguments.length == 0) {
				return self.context_menu;
			} else {
				var b = !!arguments[0];
				if (b) {
					if (!this.defaultContextMenu()) self.data.oncontextmenu = null;
					self.context_menu = true;
				} else {
					if (this.defaultContextMenu()) self.data.oncontextmenu = self.cancel_context_menu;
					self.context_menu = false;
				}
			}
		}
	}
});
Class.define("UI.Body", {
	from: ["Component"], ctor:
		function () {
			var i = this.internal["UI.Body"];
			this.debug = true;

			this.on("on", function (event, callback) {
				document.body.addEventListener(event, callback);
				return true;
			});
			this.on("off", function (event, callback) {
				document.body.removeEventListener(event, callback);
				return true;
			});

			i.__selectstart_event = function (e) { e.preventDefault(); return false; };

		}, proto: {
			debug : true,
			nodeDispose: function () {
				TabIndexCount.reset(1);
				//this.container.nodeDispose(); // remove all only inside div:container, which is permanent
				return true;
			},
			RenderLoop: function () {
				var time = window.performance.now();
				// check data ready

				// render
				//UI.Body.elementRender(time);
				// the caller are in UI.load, UI.init -> so it's self calling if initialized
				//console.log("RENDER LOOP");
				//console.log(UI);
				if (this.debug) {
					//console.log("debug");
					setTimeout(UI.Body.RenderLoop, 0);
				} else {
					//console.log(this);
					//console.log(UI.Body.RenderLoop);
					//throw "OK";
					//requestAnimationFrame(this.RenderLoop);
				}

			},
			canSelect: function (value) {
				if (value === true) {
					this.off("selectstart", this.internal["UI.Body"].__selectstart_event);
				} else if (value === false) {
					this.on("selectstart", this.internal["UI.Body"].__selectstart_event);
				}
			}
		}
});





Class.define("CHistory", {
	// behaves not WithEvents, custom on, off and emit
	// that have an extra argument 'state' besides event and callback
	ctor: function () {
		this.ready = false;
		this.construct();
	}
	, proto: {
		construct: function () {
			var self = this;
			if (this.ready) { return; } // singleton
			this.second_init = false;
			this.ready = true;
			this.last_state = "";
			this.state = "";
			this.last_args = [];
			this.args = [];
			this.handlers = {
				load: { generic: [], specific: {} },
				unload: { generic: [], specific: {} }
			};
			this.extractHash = function (url) { return url.replace(/^[^#]*#/, '').replace(/^#+|#+$/, ''); };
			this.getArgs = function () { return self.args; };
			this.getState = function () { return self.state; };
			this.setState = function (state, args) {
				self.last_args = self.args;
				self.last_state = self.state;
				//state = self.extractHash(state);
				//console.log("STATE SWITCH?");
				//console.log("FROM:" +  self.state + ":" + JSON.stringify(self.args));
				//console.log("TO:" +  state + ":" + JSON.stringify(args));
				self.args = args;
				self.state = state;
				return self.state;
			};
			this.getHash = function () { return self.extractHash(window.location.hash || location.hash); };
			this.setHash = function (hash) {
				//console.log();
				//console.log("SET HASH");
				//console.log();
				hash = self.extractHash(hash);
				if (typeof window.location.hash !== 'undefined') {
					if (window.location.hash !== hash) { window.location.hash = hash; }
				} else if (location.hash !== hash) {
					location.hash = hash;
				}
				return hash;
			};
			this.parse_state = function (query) {
				var data = query.split(":");
				return data.shift();
			};
			this.parse_args = function (query) {
				var data = query.split(":");
				data.shift();
				//var p = Object.prototype.toString.apply(data.join(":"));

				var args = data.join(":");
				var qs = {};
				var parts = args.split("&");
				for (var x = 0; x < parts.length; x++) {
					if (parts[x].indexOf("=") != -1) {
						var m = parts[x].split("=");
						var key = m.shift();
						var val = m.join("=");
						qs[key] = val;
					}
				}
				return qs;
			};
			this.go = async function (to, opt) {
				
				console.log("history",to,opt);
				if (opt == undefined || opt == null || Object.prototype.toString.apply(opt) != "[object Object]") opt = {};

				var to_base = self.parse_state(self.extractHash(to));
				var to_args = self.parse_args(self.extractHash(to));
				var hash_base = self.parse_state(self.getHash());
				var force = false;

				if ("force" in opt && opt.force === true) {
					force = false;
					console.log("force true");
				}
				console.log( "HISTORY base:",self.extractHash(to),this.getHash(),to_base,hash_base);
				if (to_base !== hash_base) {
					console.log("HISTORY 1");
					//console.log("target hash:",self.extractHash(to)," current hash:",this.getHash());
					//console.log("history A",opt);	
					//console.log("UNLOAD BEGIN");
					self.emit("unload", this.getHash(), self.getArgs());
					//console.log("UNLOAD END");

					//console.log(to_base,to_args);

					await self.emit("load",to_base,to_args); 
					//alert("HISTORY0:"+to+":"+to_base+":"+to_args);

					self.setHash(to);
					self.setState(to_base, to_args);
					//this.go(to,opt);

					self.last_state = to_base;
					self.last_args = to_args;

					("callback" in opt) && opt.callback();

				} else if (self.extractHash(to) != this.getHash()) {
					self.setHash(to);
					self.setState(to_base, to_args);
					//alert("HISTORY2");
				} else if (true || force) {
					console.log("HISTORY 4");
					//console.log("history C",to_base,opt);	


					self.emit("unload", self.getState(), self.getArgs());
					//console.log("history C2",to_base);	

					self.setState(to_base, to_args);

					console.log("HISTORY 7");
					//alert("HISTORY1");
					self.emit("load", to_base, to_args);
					console.log("HISTORY 8");


					console.log("HISTORY 9");
					self.last_state = to_base;
					self.last_args = to_args;

					("callback" in opt) && opt.callback();
					console.log("HISTORY 10");
					//alert("HISTORYM");
				} else {
					console.log("NOT LOADED AT ALL",to,opt);

				}

				return true;
			};
			this.where = function () {
				return self.last_state;
			};
			this.hashchange = function (e) {
				//console.log("HASH CHANGE");
				//console.log(e);
				// at some point someone call history.go()
				// it executes the first part that is to change hash 
				// hashes changes then hash change event is called
				// then execute the second part that is after hash changed, and the base is equal to 
				//console.log("HISTORY 3.5");
				self.go(self.getHash());
				return false;
			};
			this.on = function (event, state, handler) {
				console.log("installing",event,state);
				
				var target = null;
				if (event == "load") { target = this.handlers.load; }
				else if (event == "unload") { target = this.handlers.unload; }
				else { 
					console.log(new Error().stack);
					throw "window.History event '" + event + "' unknown."; 
				}

				if (
					handler != undefined && handler != null &&
					Object.prototype.toString.apply(handler) == "[object Function]"
				) {
					if (typeof target.specific[state] === 'undefined') { target.specific[state] = []; }
					target.specific[state].push(handler);
				} else if (Object.prototype.toString.apply(state) == "[object Function]") {
					target.generic.push(state);
				} else { throw "window.History on called with bad arguments." }
				return true;
			};
			this.off = function (event, state, callback) {
				console.log("uninstalling",event,state);
				var target = null;

				if (event == "load") { target = this.handlers.load; }
				else if (event == "unload") { target = this.handlers.unload; }
				else { throw "window.History event '" + event + "' unknown."; }
				if (
					callback != undefined && callback != null &&
					Object.prototype.toString.apply(callback) == "[object Function]"
				) {
					if (state in target.specific) {
						for (var x = target.specific[state].length - 1; x >= 0; x--) {
							if (target.specific[state][x] == callback) {
								target.specific[state].splice(x, 1);
								return true;
							}
						}
					}
				} else if (Object.prototype.toString.apply(state) == "[object Function]") {
					for (var x = 0; x < target.generic.length; x++) {
						if (target.generic[x] == callback) {
							target.generic.splice(x, 1);
							return true;
						}
					}
				} else { throw "window.History off called with bad arguments." }
				return false;
			};

			this.emit = function (event, state, args) {
				var i, n, handler, list;
				var target = null;

				if (state == undefined || state == null) {
					state = self.getState();
					//console.log("state:",state);
					args = self.getArgs();
				}

				if (event == "load") {


					target = self.handlers.load;

					list = target.generic;
					for (i = 0, n = list.length; i < n; ++i) {

						list[i](state);
					}
					//console.log("history.emit A",target.specific,state);

					if (state in target.specific) {

						list = target.specific[state];
						for (i = 0, n = list.length; i < n; ++i) {
							list[i](state, args);
						}
					}
					//console.log("LOADED??");

				}
				else if (event == "unload") {
					//console.log("emit unload ["+state+"]");
					target = self.handlers.unload;

					if (state in target.specific) {
						//console.log("specific unload");
						list = target.specific[state];
						for (i = 0, n = list.length; i < n; ++i) { list[i](state, args); }
					}
					list = target.generic;

					for (i = 0, n = list.length; i < n; ++i) {
						//console.log("global unload");
						list[i](state);
					}

				}
				else { throw "window.History event '" + event + "' unknown."; }

				return true;
			};
			this.init = function (startPage) {
				if(!this.second_init) {
					alert("FIRST INIT");
					var hash = this.getHash();
					this.setState(this.parse_state(hash), this.parse_args(hash));
					var self = this;
					window.addEventListener("hashchange", function (e) {
						return self.hashchange(e);
					});
					var hash = CHistory.getHash();
					var hash_arr = hash.split(":");
					if (hash_arr.length > 0) {
						if (hash_arr[0] == "") hash_arr[0] = startPage;
						hash = hash_arr.join(":");
					} else {
						hash = startPage;
					}
					console.log("BOOT:#" + hash);
					this.second_init = true;
					CHistory.go("#" + hash);
				} else {
					var hash = this.getHash();
					this.setState(this.parse_state(hash), this.parse_args(hash));
					var self = this;
					var hash = CHistory.getHash();
					var hash_arr = hash.split(":");
					if (hash_arr.length > 0) {
						if (hash_arr[0] == "") hash_arr[0] = startPage;
						hash = hash_arr.join(":");
					} else {
						hash = startPage;
					}
					console.log("BOOT:#" + hash);
					this.second_init = true;
					CHistory.go("#" + startPage);
					alert("SECOND INIT"+":"+hash+":"+startPage);
				}
			};
				
		}
		
	}
});

var RouterRoute = (function () {
	var pages = {};
	var RouterRoute = function (options) {
		if (!(this instanceof RouterRoute)) {
			if (options.name in pages) {
				return pages[options.name];
			}
			var obj = Object.create(RouterRoute.prototype);
			var ret = RouterRoute.apply(obj, arguments);
			pages[options.name] = ret;
			return ret;
		}
		options = options || {};
		this.name = options.name;
		this.parent = options.parent;
		this.load = options.load;
		this.unload = options.unload;
		pages[options.name] = this;
		return this;
	}
	Class.define("Router", {
		from: ["WithEvents"],
		ctor: function (target) {
			this.target = target;
			return this;
		},
		proto: {
			list : function() {
				var ret = [];
				for(var key in pages) {
					ret.push(key);
				}
				return ret;
			},
			has : function(str) {
				for(var key in pages) if(key == str) return true;
				return false;
			},
			insert: function (name, load_callback, unload_callback) {
				console.log("ROUTE INSERT ",name);
				var self = this;
				
				var _load = null;
				var _unload = null;
				var type_load_callback = Object.prototype.toString.apply(load_callback);
				if (type_load_callback != "[object Function]" && type_load_callback != "[object AsyncFunction]") throw new Error("load_callback must be function");
				_load = function (state, args) {
					console.log("loading " + name);
					console.log("state:", JSON.stringify(state));
					console.log("args:", JSON.stringify(args));

					load_callback && load_callback.apply(p, [args]);
				};
				CHistory.on("load", name, _load);
				if (unload_callback) {
					_unload = function (state, args) {
						console.log("unloading " + name);
						console.log("state:", JSON.stringify(state));
						console.log("args:", JSON.stringify(args));

						unload_callback.apply(p, [args]);
					};
					CHistory.on("unload", name, _unload);
				} else {
					_unload = function (state, args) {
						console.log("unloading " + name);
						console.log("state:", JSON.stringify(state));
						console.log("args:", JSON.stringify(args));
						UI.Body.elementsClear();
					};
					CHistory.on("unload", name, _unload);
				}
				var p = RouterRoute({
					name: name,
					parent: this.target,
					load : _load,
					unload : _unload
				});

				return p;
			},
			replace: function (name, load_callback, unload_callback) {
				this.remove(name);
				return this.insert(name, load_callback, unload_callback);
			},
			remove: function (name) {
				if(name in pages) {
					if(pages[name].load) {
						CHistory.off("load",name,pages[name].load);
					}
					if(pages[name].unload) {
						CHistory.off("unload",name,pages[name].unload);
					}
				}
				delete pages[name];
			}
		}
	});
	return RouterRoute;
})();

Object.defineProperty(window,"CHistory",{
	value:Class.create("CHistory"),
	writeable:false
});

UI.init = function (callback,clear) {

	var self = this;

	//self.Body = null;

	this.Window = Class.create("UI.Window");

	this.Window.on("load", function () {

		self.Document = Class.create("UI.Document");
		self.Window.Router = Class.create("Router", { "Router": [document.body] });
		//console.log("focus");
		window.focus();

		self.Body = Class.create("UI.Body");
		self.Body.nodeBuild(document.body, null);


		// clear all previous html components, that might be saved with save file.
		if(clear !== false) clear = true;
		if(clear) {
			var body = document.getElementsByTagName("body")[0];
			body.visited = false;
			var stack = [body];
			// remove leafs before
			var k = 0;
			while (stack.length > 0) {
				var item = stack.pop();
				var pushed = false;
				if (item.childNodes.length > 0 && item.visited == false) {
					item.visited = true;
					stack.push(item);
					for (var x = 0; x < item.childNodes.length; x++) {
						item.childNodes[x].visited = false;
						stack.push(item.childNodes[x]);
					}
					pushed = true;
				}
				var removed = false;
				if (!pushed && stack.length > 0 && item != body) { // leaf
					if (item.parentNode != null) {
						item.parentNode.removeChild(item);
					}
					removed = true;
				}
				if (item.visited && !removed && stack.length > 0 && item != body) { // maybe not leaf but already used
					console.log("rm", item);
					item.parentNode.removeChild(item);
					removed = true;
				}
			}
		}
		console.log("[UI.boot]");

		

		self.Window.internal["UI.Window"].loaded = true;

		self.Body.RenderLoop();

		// load default pages


		callback && callback();


	});



};

Class.define("DeviceResolution", {
	from: ["Component"]
	, ctor: function () {
		//this.internal.WithDOMNode.parent = null;
		//this.internal.WithDOMNode.parent_component = null;
		this.on("nodeBuild",async function() {
			this.schema = await this.elementPushPacketAsync(`
				<style>
					.displayPresentation {
						padding-left:30px;
						border:solid 1px #000;
						background-color: #498fff;
					}
					.nHD {
						width:640px;
						height:320px;
					}
					.VGA640 {
						width:640px;
						height:480px;
					}
					.VGA800 {
						width:800px;
						height:640px;
					}
					.SVGA {
						width:1280px;
						height:1080px;
					}
					.HD {
						width:1280px;
						height:720px;

					}
				</style>
				<div id="device"></div>
			`);
			this.schema.el.device.classList.add("displayPresentation");
			this.schema.el.device.classList.add("nHD");
			this.screenbanner_size = () => {
				return [100,30];
			};
			this.screennHD = () => {
				this.boot();
				this.schema.el.device.classList.add("nHD");
				return [640,320];
			};
			this.screenVGA640 = () => {
				this.boot();
				this.schema.el.device.classList.add("VGA640");
				return [640,480];
			};
			this.screenVGA800 = () => {
				this.boot();
				this.schema.el.device.classList.add("VGA800");
				return [800,640];
			};
			this.screenSVGA = () => {
				this.boot();
				this.schema.el.device.classList.add("SVGA");
				return [1280,1080];
			};
			this.screenHD = () => {
				this.boot();
				this.schema.el.device.classList.add("HD");
				return [1280,720];
			};
			this["screenFULL HD"] = () => {
				this.boot();
				this.schema.el.device.classList.add("FULL-HD");
				return [1920,1028];
			};
			this["screen4FULLHD"] = () => {
				this.boot();
				this.schema.el.device.classList.add("4FULL-HD");
				return [3840,2160];
			};
			this["screen4K UHD"] = () => { // 4 SVGA
				this.boot();
				this.schema.el.device.classList.add("4K-UHD");
				return [4096,2160];
			};
		});
		
		this.boot = function() {
			var arr = ["nHD","VGA640","VGA800"];
			for(var x = 0; x < arr.length;x++) {
				this.schema.el.device.classList.remove(arr[x]);
			}
		}
	},
	proto: {
		
	}
});

/*

var data = Class.create("UI.Body");
self.Body.nodeBuild(document.body, null);

var data = Class.create("UI.Body");
self.Body.nodeBuild(document.body, null);

await node.elementSetPacketAsync(` // setpacket defines a schema
	<script>
		console.error("?1",this.children);
	</s`+`cript>
	<span>{{this.children()}}</span>
`,{context:{}}); // to enabled this.children() must create a context.
await node.elementChildren().elementSetPacketAsync(`<span>OK</span>`);

*/