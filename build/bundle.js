
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\Footer.svelte generated by Svelte v3.46.4 */

    const file$4 = "src\\components\\Footer.svelte";

    function create_fragment$5(ctx) {
    	let footer;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			attr_dev(footer, "class", "footer svelte-g82txz");
    			add_location(footer, file$4, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    var states;
    (function (states) {
        states[states["LANDING"] = 0] = "LANDING";
        states[states["LOGGED"] = 1] = "LOGGED";
        states[states["KID"] = 2] = "KID";
    })(states || (states = {}));
    var language;
    (function (language) {
        language[language["RU"] = 0] = "RU";
        language[language["EN"] = 1] = "EN";
    })(language || (language = {}));

    writable(states.LANDING);
    let lang = writable(language.RU);

    /* src\components\Label.svelte generated by Svelte v3.46.4 */

    function create_fragment$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*value*/ ctx[0]);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value*/ 1) set_data_dev(t, /*value*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Label', slots, []);
    	let { values } = $$props;
    	let value = values[0];
    	const unsub = lang.subscribe(lang => $$invalidate(0, value = lang == language.RU ? values[0] : values[1]));
    	onDestroy(unsub);
    	const writable_props = ['values'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Label> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('values' in $$props) $$invalidate(1, values = $$props.values);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		lang,
    		language,
    		values,
    		value,
    		unsub
    	});

    	$$self.$inject_state = $$props => {
    		if ('values' in $$props) $$invalidate(1, values = $$props.values);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, values];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { values: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*values*/ ctx[1] === undefined && !('values' in props)) {
    			console.warn("<Label> was created without expected prop 'values'");
    		}
    	}

    	get values() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set values(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.46.4 */
    const file$3 = "src\\components\\Header.svelte";

    function create_fragment$3(ctx) {
    	let nav;
    	let div0;
    	let t1;
    	let div1;
    	let a0;
    	let label0;
    	let t2;
    	let a1;
    	let label1;
    	let t3;
    	let a2;
    	let label2;
    	let current;

    	label0 = new Label({
    			props: { values: ["О НАС", "ABOUT US"] },
    			$$inline: true
    		});

    	label1 = new Label({
    			props: { values: ["КОНТАКТЫ", "CONTACTS"] },
    			$$inline: true
    		});

    	label2 = new Label({
    			props: { values: ["ВОЙТИ", "LOG IN"] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div0 = element("div");
    			div0.textContent = "English Math";
    			t1 = space();
    			div1 = element("div");
    			a0 = element("a");
    			create_component(label0.$$.fragment);
    			t2 = space();
    			a1 = element("a");
    			create_component(label1.$$.fragment);
    			t3 = space();
    			a2 = element("a");
    			create_component(label2.$$.fragment);
    			attr_dev(div0, "class", "logo svelte-16kqlss");
    			add_location(div0, file$3, 5, 4, 119);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-16kqlss");
    			add_location(a0, file$3, 10, 8, 278);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-16kqlss");
    			add_location(a1, file$3, 11, 8, 343);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "svelte-16kqlss");
    			add_location(a2, file$3, 12, 8, 411);
    			add_location(div1, file$3, 8, 4, 177);
    			attr_dev(nav, "class", "navigation svelte-16kqlss");
    			add_location(nav, file$3, 4, 0, 89);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div0);
    			append_dev(nav, t1);
    			append_dev(nav, div1);
    			append_dev(div1, a0);
    			mount_component(label0, a0, null);
    			append_dev(div1, t2);
    			append_dev(div1, a1);
    			mount_component(label1, a1, null);
    			append_dev(div1, t3);
    			append_dev(div1, a2);
    			mount_component(label2, a2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label0.$$.fragment, local);
    			transition_in(label1.$$.fragment, local);
    			transition_in(label2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label0.$$.fragment, local);
    			transition_out(label1.$$.fragment, local);
    			transition_out(label2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(label0);
    			destroy_component(label1);
    			destroy_component(label2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Label });
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Button.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\components\\Button.svelte";

    function create_fragment$2(ctx) {
    	let button;
    	let button_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty("button " + /*className*/ ctx[1]) + " svelte-18pg92h"));
    			add_location(button, file$2, 4, 0, 92);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*onclick*/ ctx[0])) /*onclick*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*className*/ 2 && button_class_value !== (button_class_value = "" + (null_to_empty("button " + /*className*/ ctx[1]) + " svelte-18pg92h"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);

    	let { onclick = () => {
    		
    	} } = $$props;

    	let { className = "" } = $$props;
    	const writable_props = ['onclick', 'className'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('onclick' in $$props) $$invalidate(0, onclick = $$props.onclick);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ onclick, className });

    	$$self.$inject_state = $$props => {
    		if ('onclick' in $$props) $$invalidate(0, onclick = $$props.onclick);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [onclick, className, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { onclick: 0, className: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get onclick() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onclick(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Landing.svelte generated by Svelte v3.46.4 */
    const file$1 = "src\\components\\Landing.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (71:12) <Button class="button">
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Попробовать");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(71:12) <Button class=\\\"button\\\">",
    		ctx
    	});

    	return block;
    }

    // (105:12) {#each seriesItems as item}
    function create_each_block_2(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span0;
    	let t1_value = /*item*/ ctx[4].name + "";
    	let t1;
    	let t2;
    	let span1;
    	let raw_value = /*item*/ ctx[4].text + "";
    	let t3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			span1 = element("span");
    			t3 = space();
    			if (!src_url_equal(img.src, img_src_value = /*item*/ ctx[4].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "item");
    			attr_dev(img, "class", "svelte-74qhhg");
    			add_location(img, file$1, 106, 20, 5311);
    			attr_dev(span0, "class", "name svelte-74qhhg");
    			add_location(span0, file$1, 107, 20, 5366);
    			attr_dev(span1, "class", "svelte-74qhhg");
    			add_location(span1, file$1, 108, 20, 5425);
    			attr_dev(div, "class", "item svelte-74qhhg");
    			add_location(div, file$1, 105, 16, 5271);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span0);
    			append_dev(span0, t1);
    			append_dev(div, t2);
    			append_dev(div, span1);
    			span1.innerHTML = raw_value;
    			append_dev(div, t3);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(105:12) {#each seriesItems as item}",
    		ctx
    	});

    	return block;
    }

    // (129:12) {#each conditionsItems as item}
    function create_each_block_1(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*item*/ ctx[4].name + "";
    	let t0;
    	let t1;
    	let span;
    	let raw_value = /*item*/ ctx[4].text + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			t2 = space();
    			attr_dev(div0, "class", "name svelte-74qhhg");
    			add_location(div0, file$1, 130, 20, 6460);
    			attr_dev(span, "class", "text svelte-74qhhg");
    			add_location(span, file$1, 131, 20, 6517);
    			attr_dev(div1, "class", "item svelte-74qhhg");
    			add_location(div1, file$1, 129, 16, 6420);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			append_dev(div1, span);
    			span.innerHTML = raw_value;
    			append_dev(div1, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(129:12) {#each conditionsItems as item}",
    		ctx
    	});

    	return block;
    }

    // (159:12) {#each reviews as item}
    function create_each_block(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let raw_value = /*item*/ ctx[4].text + "";
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			t1 = space();
    			if (!src_url_equal(img.src, img_src_value = /*item*/ ctx[4].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-74qhhg");
    			add_location(img, file$1, 160, 20, 8292);
    			attr_dev(span, "class", "text svelte-74qhhg");
    			add_location(span, file$1, 161, 20, 8343);
    			attr_dev(div, "class", "item svelte-74qhhg");
    			add_location(div, file$1, 159, 16, 8252);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span);
    			span.innerHTML = raw_value;
    			append_dev(div, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(159:12) {#each reviews as item}",
    		ctx
    	});

    	return block;
    }

    // (251:16) <Button>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Оставить заявку");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(251:16) <Button>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div25;
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let span0;
    	let t2;
    	let br0;
    	let t3;
    	let t4;
    	let h0;
    	let t6;
    	let h1;
    	let t7;
    	let b0;
    	let t9;
    	let button0;
    	let t10;
    	let img0;
    	let img0_src_value;
    	let t11;
    	let div6;
    	let div4;
    	let img1;
    	let img1_src_value;
    	let t12;
    	let div3;
    	let h2;
    	let t13;
    	let span1;
    	let t15;
    	let t16;
    	let p0;
    	let b1;
    	let t18;
    	let b2;
    	let t20;
    	let b3;
    	let t22;
    	let t23;
    	let p1;
    	let t25;
    	let p2;
    	let b4;
    	let t27;
    	let ul0;
    	let li0;
    	let t29;
    	let li1;
    	let t31;
    	let li2;
    	let t33;
    	let li3;
    	let t35;
    	let p3;
    	let t36;
    	let span2;
    	let t38;
    	let t39;
    	let div5;
    	let t40;
    	let div9;
    	let h3;
    	let t41;
    	let span3;
    	let t43;
    	let t44;
    	let div7;
    	let ul1;
    	let li4;
    	let t46;
    	let li5;
    	let t48;
    	let li6;
    	let t50;
    	let li7;
    	let t52;
    	let img2;
    	let img2_src_value;
    	let t53;
    	let div8;
    	let t54;
    	let div12;
    	let h4;
    	let span4;
    	let br1;
    	let t56;
    	let span5;
    	let t58;
    	let div11;
    	let img3;
    	let img3_src_value;
    	let t59;
    	let div10;
    	let t60;
    	let br2;
    	let br3;
    	let t61;
    	let br4;
    	let br5;
    	let t62;
    	let br6;
    	let br7;
    	let t63;
    	let t64;
    	let div14;
    	let h5;
    	let span6;
    	let t66;
    	let div13;
    	let t67;
    	let div20;
    	let h6;
    	let span7;
    	let t69;
    	let div19;
    	let div16;
    	let img4;
    	let img4_src_value;
    	let t70;
    	let div15;
    	let h7;
    	let t72;
    	let h8;
    	let t73;
    	let br8;
    	let t74;
    	let br9;
    	let t75;
    	let br10;
    	let t76;
    	let br11;
    	let t77;
    	let t78;
    	let br12;
    	let t79;
    	let br13;
    	let t80;
    	let br14;
    	let t81;
    	let div18;
    	let img5;
    	let img5_src_value;
    	let t82;
    	let div17;
    	let h9;
    	let t84;
    	let h10;
    	let t85;
    	let br15;
    	let t86;
    	let br16;
    	let t87;
    	let br17;
    	let t88;
    	let br18;
    	let t89;
    	let br19;
    	let br20;
    	let t90;
    	let t91;
    	let div24;
    	let h11;
    	let span8;
    	let br21;
    	let t93;
    	let span9;
    	let t95;
    	let div23;
    	let div21;
    	let h12;
    	let t97;
    	let span10;
    	let t99;
    	let span11;
    	let t101;
    	let span12;
    	let t103;
    	let span13;
    	let t105;
    	let span14;
    	let t107;
    	let span15;
    	let t109;
    	let span16;
    	let t110;
    	let br22;
    	let t111;
    	let br23;
    	let t112;
    	let t113;
    	let div22;
    	let input0;
    	let t114;
    	let input1;
    	let t115;
    	let input2;
    	let t116;
    	let button1;
    	let current;

    	button0 = new Button({
    			props: {
    				class: "button",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value_2 = /*seriesItems*/ ctx[0];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*conditionsItems*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*reviews*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	button1 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div25 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text("Математика ");
    			span0 = element("span");
    			span0.textContent = "на английском";
    			t2 = space();
    			br0 = element("br");
    			t3 = text("для детей 5-7 лет");
    			t4 = space();
    			h0 = element("h");
    			h0.textContent = "Поможем вашему ребенку развить абстрактное мышление и выучить английский.";
    			t6 = space();
    			h1 = element("h");
    			t7 = text("Попробуйте 1 неделю ");
    			b0 = element("b");
    			b0.textContent = "бесплатно";
    			t9 = space();
    			create_component(button0.$$.fragment);
    			t10 = space();
    			img0 = element("img");
    			t11 = space();
    			div6 = element("div");
    			div4 = element("div");
    			img1 = element("img");
    			t12 = space();
    			div3 = element("div");
    			h2 = element("h");
    			t13 = text("Что такое ");
    			span1 = element("span");
    			span1.textContent = "English Math";
    			t15 = text("?");
    			t16 = space();
    			p0 = element("p");
    			b1 = element("b");
    			b1.textContent = "Math English";
    			t18 = text(" - это онлайн-школа развития интеллекта для детей в возрасте от ");
    			b2 = element("b");
    			b2.textContent = "5";
    			t20 = text(" до ");
    			b3 = element("b");
    			b3.textContent = "7";
    			t22 = text(" лет.");
    			t23 = space();
    			p1 = element("p");
    			p1.textContent = "Вместе с опытными преподавателями мы разработали программу, которая поможет вашему ребенку освоить арифметику и математику, развить логику в игровом формате.";
    			t25 = space();
    			p2 = element("p");
    			b4 = element("b");
    			b4.textContent = "Наша программа нацелена на развитие у ребенка";
    			t27 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "Cамостоятельности";
    			t29 = space();
    			li1 = element("li");
    			li1.textContent = "Креативности";
    			t31 = space();
    			li2 = element("li");
    			li2.textContent = "Концентрации и внимательности";
    			t33 = space();
    			li3 = element("li");
    			li3.textContent = "Абстрактного мышления";
    			t35 = space();
    			p3 = element("p");
    			t36 = text("Все это достигается засчет обучения на ");
    			span2 = element("span");
    			span2.textContent = "английском языке";
    			t38 = text(".");
    			t39 = space();
    			div5 = element("div");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t40 = space();
    			div9 = element("div");
    			h3 = element("h");
    			t41 = text("Как устроена ");
    			span3 = element("span");
    			span3.textContent = "платформа";
    			t43 = text("?");
    			t44 = space();
    			div7 = element("div");
    			ul1 = element("ul");
    			li4 = element("li");
    			li4.textContent = "Небольшой размер группы помогает сделать процесс обучения персонализированным";
    			t46 = space();
    			li5 = element("li");
    			li5.textContent = "Удаленный формат - проходите задания на платформе из любого места в любое время";
    			t48 = space();
    			li6 = element("li");
    			li6.textContent = "Доступ к статистике ребенка и всем учебным материалам в кабинете родителя";
    			t50 = space();
    			li7 = element("li");
    			li7.textContent = "Быстрая связь с учителем";
    			t52 = space();
    			img2 = element("img");
    			t53 = space();
    			div8 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t54 = space();
    			div12 = element("div");
    			h4 = element("h");
    			span4 = element("span");
    			span4.textContent = "Почему математика на английском -";
    			br1 = element("br");
    			t56 = space();
    			span5 = element("span");
    			span5.textContent = "- это совсем не страшно";
    			t58 = space();
    			div11 = element("div");
    			img3 = element("img");
    			t59 = space();
    			div10 = element("div");
    			t60 = text("Даже если ребенок никогда не изучал английский, прохождение курса не будет слишком сложным. Уроки составлены так, что язык будет изучаться с самых основ.");
    			br2 = element("br");
    			br3 = element("br");
    			t61 = text("\r\n                Новые слова вводятся естественно, очень важную роль играет в уроке видео, где учитель показывает слова картинками или жестами, закрепляя ассоциации.");
    			br4 = element("br");
    			br5 = element("br");
    			t62 = text("\r\n                Уже через 2 недели ребенок сможет сказать простые фразы, показывать объекты и называть цифры. А через 3 месяца у 99% детей пропадает барьер перед иностранным языком, дети начинают строить диалоги на английском достаточно свободно на пройденные темы.");
    			br6 = element("br");
    			br7 = element("br");
    			t63 = text("\r\n                В школе и дома приходится считать и учить английский, что дает несомненное преимущество выпускникам English Math, ребята легко справляются с задачками и готовы не только ответить на уроке английского, но и сходить за покупками за границей.");
    			t64 = space();
    			div14 = element("div");
    			h5 = element("h");
    			span6 = element("span");
    			span6.textContent = "Отзывы";
    			t66 = space();
    			div13 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t67 = space();
    			div20 = element("div");
    			h6 = element("h");
    			span7 = element("span");
    			span7.textContent = "Наши преподаватели";
    			t69 = space();
    			div19 = element("div");
    			div16 = element("div");
    			img4 = element("img");
    			t70 = space();
    			div15 = element("div");
    			h7 = element("h");
    			h7.textContent = "Алевтина Фетодова";
    			t72 = space();
    			h8 = element("h");
    			t73 = text("Образование:");
    			br8 = element("br");
    			t74 = text("\r\n                        2010-2016, Педагогический институт Герцена, С-Пб");
    			br9 = element("br");
    			t75 = text("\r\n                        2018, повышение квалификации Стендфордский университет, направление “Внедрение иностранного языка в повседневную жизнь ребенка”\r\n                        ");
    			br10 = element("br");
    			t76 = space();
    			br11 = element("br");
    			t77 = text("\r\n                        Находит подход как к маленьким детям с 3 лет в их первых шагах к познанию мира, так и с подростками 12 лет преодолевает барьеры мышления и языковой барьер.");
    			t78 = space();
    			br12 = element("br");
    			t79 = space();
    			br13 = element("br");
    			t80 = space();
    			br14 = element("br");
    			t81 = space();
    			div18 = element("div");
    			img5 = element("img");
    			t82 = space();
    			div17 = element("div");
    			h9 = element("h");
    			h9.textContent = "Катрин Игорева";
    			t84 = space();
    			h10 = element("h");
    			t85 = text("Образование:");
    			br15 = element("br");
    			t86 = text("\r\n                        2005-2011, Педагогический институт Нового Орлеана");
    			br16 = element("br");
    			t87 = text("\r\n                        2014- 2020, лаборатория образовательных исследований ВШЭ в Москве");
    			br17 = element("br");
    			t88 = text("\r\n                        2021 - почетный профессор ВШЭ");
    			br18 = element("br");
    			t89 = space();
    			br19 = element("br");
    			br20 = element("br");
    			t90 = text("\r\n                        Для Катрин дети - это особенные люди, они очень пластичны во всем, как физически, так и в мышлении. Исследования лаборатории, новые подходы и практики Катрин переносит в свои занятия. Катрин считает, что работать с детьми, смотреть как они развиваются - это истинное счастье.");
    			t91 = space();
    			div24 = element("div");
    			h11 = element("h");
    			span8 = element("span");
    			span8.textContent = "Запишитесь на пробное занятие";
    			br21 = element("br");
    			t93 = space();
    			span9 = element("span");
    			span9.textContent = "или получите консультацию";
    			t95 = space();
    			div23 = element("div");
    			div21 = element("div");
    			h12 = element("h");
    			h12.textContent = "Стоимость курса";
    			t97 = space();
    			span10 = element("span");
    			span10.textContent = "7000 руб/мес";
    			t99 = space();
    			span11 = element("span");
    			span11.textContent = "Возврат денег";
    			t101 = space();
    			span12 = element("span");
    			span12.textContent = "У вас есть три занятия, чтобы попробовать. Если передумаете учиться, скажите — и мы вернём вам всю сумму.";
    			t103 = space();
    			span13 = element("span");
    			span13.textContent = "Сэкономьте еще 13%";
    			t105 = space();
    			span14 = element("span");
    			span14.textContent = "Вы можете получить налоговый вычет. Спросите об этом менеджера при записи на курс или прочитайте в нашей статье.";
    			t107 = space();
    			span15 = element("span");
    			span15.textContent = "Есть вопросы?";
    			t109 = space();
    			span16 = element("span");
    			t110 = text("Звоните нам 8 (800) 555-05-05 ");
    			br22 = element("br");
    			t111 = text("\r\n                    по будням с 10:00 до 19:00 МСК.");
    			br23 = element("br");
    			t112 = text("\r\n                    Звонок бесплатный.");
    			t113 = space();
    			div22 = element("div");
    			input0 = element("input");
    			t114 = space();
    			input1 = element("input");
    			t115 = space();
    			input2 = element("input");
    			t116 = space();
    			create_component(button1.$$.fragment);
    			attr_dev(span0, "class", "highlight svelte-74qhhg");
    			add_location(span0, file$1, 61, 27, 3201);
    			add_location(br0, file$1, 62, 16, 3264);
    			attr_dev(div0, "class", "title svelte-74qhhg");
    			add_location(div0, file$1, 60, 12, 3153);
    			attr_dev(h0, "class", "content svelte-74qhhg");
    			add_location(h0, file$1, 64, 12, 3320);
    			add_location(b0, file$1, 68, 36, 3522);
    			attr_dev(h1, "class", "subcontent svelte-74qhhg");
    			add_location(h1, file$1, 67, 12, 3462);
    			if (!src_url_equal(img0.src, img0_src_value = "https://cdn-icons-png.flaticon.com/512/3557/3557694.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-74qhhg");
    			add_location(img0, file$1, 73, 12, 3659);
    			attr_dev(div1, "class", "container svelte-74qhhg");
    			add_location(div1, file$1, 59, 8, 3116);
    			attr_dev(div2, "class", "section1 svelte-74qhhg");
    			add_location(div2, file$1, 58, 4, 3084);
    			attr_dev(img1, "class", "main-image svelte-74qhhg");
    			if (!src_url_equal(img1.src, img1_src_value = "https://www.kids-in-trips.ru/wp-content/uploads/2020/07/onlajn-lager-dlya-detej.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "girl");
    			add_location(img1, file$1, 78, 12, 3834);
    			attr_dev(span1, "class", "highlight svelte-74qhhg");
    			add_location(span1, file$1, 81, 30, 4065);
    			attr_dev(h2, "class", "title svelte-74qhhg");
    			add_location(h2, file$1, 80, 16, 4016);
    			add_location(b1, file$1, 84, 20, 4200);
    			add_location(b2, file$1, 84, 103, 4283);
    			add_location(b3, file$1, 84, 115, 4295);
    			attr_dev(p0, "class", "paragraph __first svelte-74qhhg");
    			add_location(p0, file$1, 83, 16, 4149);
    			attr_dev(p1, "class", "paragraph __second svelte-74qhhg");
    			add_location(p1, file$1, 86, 16, 4348);
    			add_location(b4, file$1, 90, 20, 4641);
    			attr_dev(p2, "class", "paragraph svelte-74qhhg");
    			add_location(p2, file$1, 89, 16, 4598);
    			attr_dev(li0, "class", "svelte-74qhhg");
    			add_location(li0, file$1, 93, 20, 4772);
    			attr_dev(li1, "class", "svelte-74qhhg");
    			add_location(li1, file$1, 94, 20, 4820);
    			attr_dev(li2, "class", "svelte-74qhhg");
    			add_location(li2, file$1, 95, 20, 4863);
    			attr_dev(li3, "class", "svelte-74qhhg");
    			add_location(li3, file$1, 96, 20, 4923);
    			attr_dev(ul0, "class", "list svelte-74qhhg");
    			add_location(ul0, file$1, 92, 16, 4733);
    			attr_dev(span2, "class", "highlight svelte-74qhhg");
    			add_location(span2, file$1, 99, 59, 5076);
    			attr_dev(p3, "class", "paragraph svelte-74qhhg");
    			add_location(p3, file$1, 98, 16, 4994);
    			attr_dev(div3, "class", "description svelte-74qhhg");
    			add_location(div3, file$1, 79, 12, 3973);
    			attr_dev(div4, "class", "content svelte-74qhhg");
    			add_location(div4, file$1, 77, 8, 3799);
    			attr_dev(div5, "class", "series svelte-74qhhg");
    			add_location(div5, file$1, 103, 8, 5192);
    			attr_dev(div6, "class", "section2 svelte-74qhhg");
    			add_location(div6, file$1, 76, 4, 3767);
    			attr_dev(span3, "class", "highlight svelte-74qhhg");
    			add_location(span3, file$1, 115, 25, 5610);
    			attr_dev(h3, "class", "title svelte-74qhhg");
    			add_location(h3, file$1, 114, 8, 5566);
    			attr_dev(li4, "class", "svelte-74qhhg");
    			add_location(li4, file$1, 119, 16, 5749);
    			attr_dev(li5, "class", "svelte-74qhhg");
    			add_location(li5, file$1, 120, 16, 5853);
    			attr_dev(li6, "class", "svelte-74qhhg");
    			add_location(li6, file$1, 121, 16, 5959);
    			attr_dev(li7, "class", "svelte-74qhhg");
    			add_location(li7, file$1, 122, 16, 6059);
    			attr_dev(ul1, "class", "list svelte-74qhhg");
    			add_location(ul1, file$1, 118, 12, 5714);
    			if (!src_url_equal(img2.src, img2_src_value = "https://sun9-51.userapi.com/impf/80gOc79PgB_LpWNSbsOkOzV2wNWHUI_osYhQXA/r43sN_dtI8U.jpg?size=448x327&quality=95&sign=b380db9b83b47c311bd15431baad0424&type=album")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "riba");
    			attr_dev(img2, "class", "svelte-74qhhg");
    			add_location(img2, file$1, 124, 12, 6125);
    			attr_dev(div7, "class", "description svelte-74qhhg");
    			add_location(div7, file$1, 117, 8, 5675);
    			attr_dev(div8, "class", "series svelte-74qhhg");
    			add_location(div8, file$1, 127, 8, 6337);
    			attr_dev(div9, "class", "section3 svelte-74qhhg");
    			add_location(div9, file$1, 113, 4, 5534);
    			attr_dev(span4, "class", "highlight svelte-74qhhg");
    			add_location(span4, file$1, 139, 12, 6704);
    			add_location(br1, file$1, 139, 76, 6768);
    			attr_dev(span5, "class", "highlight svelte-74qhhg");
    			add_location(span5, file$1, 140, 12, 6786);
    			attr_dev(h4, "class", "title svelte-74qhhg");
    			add_location(h4, file$1, 138, 8, 6673);
    			if (!src_url_equal(img3.src, img3_src_value = "https://sun9-52.userapi.com/impf/EnhwbyugPISPWdeT4EG_FpstBBigqR9w1MWc-g/j7GW1Y6VIJ0.jpg?size=590x340&quality=95&sign=37900aecf834bcb6851d0dd6c2218608&type=album")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			attr_dev(img3, "class", "svelte-74qhhg");
    			add_location(img3, file$1, 143, 12, 6900);
    			add_location(br2, file$1, 145, 169, 7282);
    			add_location(br3, file$1, 145, 173, 7286);
    			add_location(br4, file$1, 146, 164, 7456);
    			add_location(br5, file$1, 146, 168, 7460);
    			add_location(br6, file$1, 147, 265, 7731);
    			add_location(br7, file$1, 147, 269, 7735);
    			attr_dev(div10, "class", "text svelte-74qhhg");
    			add_location(div10, file$1, 144, 12, 7093);
    			attr_dev(div11, "class", "content svelte-74qhhg");
    			add_location(div11, file$1, 142, 8, 6865);
    			attr_dev(div12, "class", "section4 svelte-74qhhg");
    			add_location(div12, file$1, 137, 4, 6641);
    			attr_dev(span6, "class", "highlight svelte-74qhhg");
    			add_location(span6, file$1, 155, 12, 8116);
    			attr_dev(h5, "class", "title svelte-74qhhg");
    			add_location(h5, file$1, 154, 8, 8085);
    			attr_dev(div13, "class", "series svelte-74qhhg");
    			add_location(div13, file$1, 157, 8, 8177);
    			attr_dev(div14, "class", "section5 svelte-74qhhg");
    			add_location(div14, file$1, 153, 4, 8053);
    			attr_dev(span7, "class", "highlight svelte-74qhhg");
    			add_location(span7, file$1, 169, 12, 8530);
    			attr_dev(h6, "class", "title svelte-74qhhg");
    			add_location(h6, file$1, 168, 8, 8499);
    			if (!src_url_equal(img4.src, img4_src_value = "https://sun9-87.userapi.com/impf/acx8KSxLPRxu18PUmm32jJS24xiF1OQVx_xbxw/qP7xhrtIoas.jpg?size=264x264&quality=95&sign=a656554822efbe707c30d1c97b88dc4c&type=album")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "");
    			attr_dev(img4, "class", "svelte-74qhhg");
    			add_location(img4, file$1, 174, 16, 8680);
    			attr_dev(h7, "class", "name svelte-74qhhg");
    			add_location(h7, file$1, 176, 20, 8917);
    			add_location(br8, file$1, 180, 36, 9065);
    			add_location(br9, file$1, 181, 72, 9143);
    			add_location(br10, file$1, 183, 24, 9326);
    			add_location(br11, file$1, 184, 24, 9356);
    			add_location(h8, file$1, 179, 20, 9024);
    			attr_dev(div15, "class", "text svelte-74qhhg");
    			add_location(div15, file$1, 175, 16, 8877);
    			attr_dev(div16, "class", "teacher svelte-74qhhg");
    			add_location(div16, file$1, 173, 12, 8641);
    			add_location(br12, file$1, 190, 24, 9639);
    			add_location(br13, file$1, 191, 24, 9669);
    			add_location(br14, file$1, 192, 24, 9699);
    			if (!src_url_equal(img5.src, img5_src_value = "https://images.pexels.com/photos/8423388/pexels-photo-8423388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "");
    			attr_dev(img5, "class", "svelte-74qhhg");
    			add_location(img5, file$1, 195, 16, 9758);
    			attr_dev(h9, "class", "name svelte-74qhhg");
    			add_location(h9, file$1, 197, 20, 9945);
    			add_location(br15, file$1, 201, 36, 10090);
    			add_location(br16, file$1, 202, 73, 10169);
    			add_location(br17, file$1, 203, 89, 10264);
    			add_location(br18, file$1, 204, 53, 10323);
    			add_location(br19, file$1, 205, 24, 10353);
    			add_location(br20, file$1, 205, 28, 10357);
    			add_location(h10, file$1, 200, 20, 10049);
    			attr_dev(div17, "class", "text svelte-74qhhg");
    			add_location(div17, file$1, 196, 16, 9905);
    			attr_dev(div18, "class", "teacher svelte-74qhhg");
    			add_location(div18, file$1, 194, 12, 9719);
    			attr_dev(div19, "class", "teachers");
    			add_location(div19, file$1, 172, 8, 8605);
    			attr_dev(div20, "class", "section6 svelte-74qhhg");
    			add_location(div20, file$1, 167, 4, 8467);
    			attr_dev(span8, "class", "highlight svelte-74qhhg");
    			add_location(span8, file$1, 216, 12, 10838);
    			add_location(br21, file$1, 216, 72, 10898);
    			attr_dev(span9, "class", "highlight2 svelte-74qhhg");
    			add_location(span9, file$1, 217, 12, 10916);
    			attr_dev(h11, "class", "title svelte-74qhhg");
    			add_location(h11, file$1, 215, 8, 10807);
    			attr_dev(h12, "class", "cost svelte-74qhhg");
    			add_location(h12, file$1, 222, 16, 11077);
    			attr_dev(span10, "class", "highlight svelte-74qhhg");
    			add_location(span10, file$1, 225, 16, 11170);
    			attr_dev(span11, "class", "subtitle svelte-74qhhg");
    			add_location(span11, file$1, 226, 16, 11231);
    			attr_dev(span12, "class", "text svelte-74qhhg");
    			add_location(span12, file$1, 229, 16, 11332);
    			attr_dev(span13, "class", "subtitle svelte-74qhhg");
    			add_location(span13, file$1, 232, 16, 11521);
    			attr_dev(span14, "class", "text svelte-74qhhg");
    			add_location(span14, file$1, 235, 16, 11627);
    			attr_dev(span15, "class", "subtitle svelte-74qhhg");
    			add_location(span15, file$1, 237, 24, 11806);
    			add_location(br22, file$1, 241, 50, 11978);
    			add_location(br23, file$1, 242, 51, 12035);
    			attr_dev(span16, "class", "text svelte-74qhhg");
    			add_location(span16, file$1, 240, 16, 11907);
    			attr_dev(div21, "class", "left-column svelte-74qhhg");
    			add_location(div21, file$1, 221, 12, 11034);
    			attr_dev(input0, "placeholder", "Имя");
    			attr_dev(input0, "class", "svelte-74qhhg");
    			add_location(input0, file$1, 247, 16, 12182);
    			attr_dev(input1, "placeholder", "Телефон");
    			attr_dev(input1, "class", "svelte-74qhhg");
    			add_location(input1, file$1, 248, 16, 12225);
    			attr_dev(input2, "placeholder", "Email");
    			attr_dev(input2, "class", "svelte-74qhhg");
    			add_location(input2, file$1, 249, 16, 12272);
    			attr_dev(div22, "class", "right-column svelte-74qhhg");
    			add_location(div22, file$1, 246, 12, 12138);
    			attr_dev(div23, "class", "content svelte-74qhhg");
    			add_location(div23, file$1, 220, 8, 10999);
    			attr_dev(div24, "class", "section7 svelte-74qhhg");
    			add_location(div24, file$1, 214, 4, 10775);
    			attr_dev(div25, "class", "main-content svelte-74qhhg");
    			add_location(div25, file$1, 57, 0, 3052);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div25, anchor);
    			append_dev(div25, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, span0);
    			append_dev(div0, t2);
    			append_dev(div0, br0);
    			append_dev(div0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, h0);
    			append_dev(div1, t6);
    			append_dev(div1, h1);
    			append_dev(h1, t7);
    			append_dev(h1, b0);
    			append_dev(div1, t9);
    			mount_component(button0, div1, null);
    			append_dev(div1, t10);
    			append_dev(div1, img0);
    			append_dev(div25, t11);
    			append_dev(div25, div6);
    			append_dev(div6, div4);
    			append_dev(div4, img1);
    			append_dev(div4, t12);
    			append_dev(div4, div3);
    			append_dev(div3, h2);
    			append_dev(h2, t13);
    			append_dev(h2, span1);
    			append_dev(h2, t15);
    			append_dev(div3, t16);
    			append_dev(div3, p0);
    			append_dev(p0, b1);
    			append_dev(p0, t18);
    			append_dev(p0, b2);
    			append_dev(p0, t20);
    			append_dev(p0, b3);
    			append_dev(p0, t22);
    			append_dev(div3, t23);
    			append_dev(div3, p1);
    			append_dev(div3, t25);
    			append_dev(div3, p2);
    			append_dev(p2, b4);
    			append_dev(div3, t27);
    			append_dev(div3, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t29);
    			append_dev(ul0, li1);
    			append_dev(ul0, t31);
    			append_dev(ul0, li2);
    			append_dev(ul0, t33);
    			append_dev(ul0, li3);
    			append_dev(div3, t35);
    			append_dev(div3, p3);
    			append_dev(p3, t36);
    			append_dev(p3, span2);
    			append_dev(p3, t38);
    			append_dev(div6, t39);
    			append_dev(div6, div5);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div5, null);
    			}

    			append_dev(div25, t40);
    			append_dev(div25, div9);
    			append_dev(div9, h3);
    			append_dev(h3, t41);
    			append_dev(h3, span3);
    			append_dev(h3, t43);
    			append_dev(div9, t44);
    			append_dev(div9, div7);
    			append_dev(div7, ul1);
    			append_dev(ul1, li4);
    			append_dev(ul1, t46);
    			append_dev(ul1, li5);
    			append_dev(ul1, t48);
    			append_dev(ul1, li6);
    			append_dev(ul1, t50);
    			append_dev(ul1, li7);
    			append_dev(div7, t52);
    			append_dev(div7, img2);
    			append_dev(div9, t53);
    			append_dev(div9, div8);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div8, null);
    			}

    			append_dev(div25, t54);
    			append_dev(div25, div12);
    			append_dev(div12, h4);
    			append_dev(h4, span4);
    			append_dev(h4, br1);
    			append_dev(h4, t56);
    			append_dev(h4, span5);
    			append_dev(div12, t58);
    			append_dev(div12, div11);
    			append_dev(div11, img3);
    			append_dev(div11, t59);
    			append_dev(div11, div10);
    			append_dev(div10, t60);
    			append_dev(div10, br2);
    			append_dev(div10, br3);
    			append_dev(div10, t61);
    			append_dev(div10, br4);
    			append_dev(div10, br5);
    			append_dev(div10, t62);
    			append_dev(div10, br6);
    			append_dev(div10, br7);
    			append_dev(div10, t63);
    			append_dev(div25, t64);
    			append_dev(div25, div14);
    			append_dev(div14, h5);
    			append_dev(h5, span6);
    			append_dev(div14, t66);
    			append_dev(div14, div13);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div13, null);
    			}

    			append_dev(div25, t67);
    			append_dev(div25, div20);
    			append_dev(div20, h6);
    			append_dev(h6, span7);
    			append_dev(div20, t69);
    			append_dev(div20, div19);
    			append_dev(div19, div16);
    			append_dev(div16, img4);
    			append_dev(div16, t70);
    			append_dev(div16, div15);
    			append_dev(div15, h7);
    			append_dev(div15, t72);
    			append_dev(div15, h8);
    			append_dev(h8, t73);
    			append_dev(h8, br8);
    			append_dev(h8, t74);
    			append_dev(h8, br9);
    			append_dev(h8, t75);
    			append_dev(h8, br10);
    			append_dev(h8, t76);
    			append_dev(h8, br11);
    			append_dev(h8, t77);
    			append_dev(div19, t78);
    			append_dev(div19, br12);
    			append_dev(div19, t79);
    			append_dev(div19, br13);
    			append_dev(div19, t80);
    			append_dev(div19, br14);
    			append_dev(div19, t81);
    			append_dev(div19, div18);
    			append_dev(div18, img5);
    			append_dev(div18, t82);
    			append_dev(div18, div17);
    			append_dev(div17, h9);
    			append_dev(div17, t84);
    			append_dev(div17, h10);
    			append_dev(h10, t85);
    			append_dev(h10, br15);
    			append_dev(h10, t86);
    			append_dev(h10, br16);
    			append_dev(h10, t87);
    			append_dev(h10, br17);
    			append_dev(h10, t88);
    			append_dev(h10, br18);
    			append_dev(h10, t89);
    			append_dev(h10, br19);
    			append_dev(h10, br20);
    			append_dev(h10, t90);
    			append_dev(div25, t91);
    			append_dev(div25, div24);
    			append_dev(div24, h11);
    			append_dev(h11, span8);
    			append_dev(h11, br21);
    			append_dev(h11, t93);
    			append_dev(h11, span9);
    			append_dev(div24, t95);
    			append_dev(div24, div23);
    			append_dev(div23, div21);
    			append_dev(div21, h12);
    			append_dev(div21, t97);
    			append_dev(div21, span10);
    			append_dev(div21, t99);
    			append_dev(div21, span11);
    			append_dev(div21, t101);
    			append_dev(div21, span12);
    			append_dev(div21, t103);
    			append_dev(div21, span13);
    			append_dev(div21, t105);
    			append_dev(div21, span14);
    			append_dev(div21, t107);
    			append_dev(div21, span15);
    			append_dev(div21, t109);
    			append_dev(div21, span16);
    			append_dev(span16, t110);
    			append_dev(span16, br22);
    			append_dev(span16, t111);
    			append_dev(span16, br23);
    			append_dev(span16, t112);
    			append_dev(div23, t113);
    			append_dev(div23, div22);
    			append_dev(div22, input0);
    			append_dev(div22, t114);
    			append_dev(div22, input1);
    			append_dev(div22, t115);
    			append_dev(div22, input2);
    			append_dev(div22, t116);
    			mount_component(button1, div22, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);

    			if (dirty & /*seriesItems*/ 1) {
    				each_value_2 = /*seriesItems*/ ctx[0];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(div5, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*conditionsItems*/ 2) {
    				each_value_1 = /*conditionsItems*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div8, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*reviews*/ 4) {
    				each_value = /*reviews*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div13, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div25);
    			destroy_component(button0);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Landing', slots, []);

    	let promoItems = [
    		{
    			image: '../static/image2.png',
    			name: "Олег",
    			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    		},
    		{
    			image: 'https://st.depositphotos.com/1771835/2035/i/600/depositphotos_20355973-stock-photo-portrait-real-high-definition-grey.jpg',
    			name: "Олег",
    			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    		},
    		{
    			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXC2HxEPlRBjYllA84A52N3BeFlN4S0w6OUg&usqp=CAU',
    			name: "Олег",
    			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus.'
    		}
    	];

    	let seriesItems = [
    		{
    			image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-online-web-store-flaticons-lineal-color-flat-icons-2.png',
    			name: 'Формат обучения',
    			text: 'Онлайн в группах по <b>5</b> человек'
    		},
    		{
    			image: 'https://img.icons8.com/fluency/452/overtime.png',
    			name: 'Расписание',
    			text: '<b>2</b> раза в неделю по <b>30</b> минут'
    		},
    		{
    			image: 'https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/452/external-game-game-development-icongeek26-outline-colour-icongeek26-1.png',
    			name: 'Дополнительно',
    			text: 'Интерактивные задания на платформе'
    		}
    	];

    	let conditionsItems = [
    		{
    			name: '1',
    			text: "<b>2</b> раза в неделю ребенок занимается с учителем в группе. Занятия проходят на платформе Zoom."
    		},
    		{
    			name: '2',
    			text: "Во время занятия учитель дает задания в онлайн-тренажере в виде игры."
    		},
    		{
    			name: '3',
    			text: "В конце недели учитель высылает родителям персональные рекомендации для ребенка и дополнительные материалы"
    		}
    	];

    	let reviews = [
    		{
    			image: "https://images.pexels.com/photos/286625/pexels-photo-286625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    			text: "Мы с женой на фрилансе, много путешествуем, поэтому часто Камилле приходится учиться даже в дороге. Развитием жертвовать не хочется, так что онлайн курасы - это просто спасение. Еще и язык учится заодно, что абсолютный бонус!"
    		},
    		{
    			image: "https://images.pexels.com/photos/5082634/pexels-photo-5082634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    			text: "Петру очень нравится играть на платформе, эти забавные рыбки заставляют его счиатать даже в выходные. Рад, что на российском рынке есть курсы математики на английском, потому что Петр билингв."
    		},
    		{
    			image: "https://images.pexels.com/photos/7307937/pexels-photo-7307937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    			text: "Мы с Лизой проводим это время вместе, мне нравится, что я вижу как она занимается, пока читаю рядом. Это весело, и я не боюсь, что она оплатит все курсы на сто лет, потому что есть детский режим."
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Landing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Button,
    		promoItems,
    		seriesItems,
    		conditionsItems,
    		reviews
    	});

    	$$self.$inject_state = $$props => {
    		if ('promoItems' in $$props) promoItems = $$props.promoItems;
    		if ('seriesItems' in $$props) $$invalidate(0, seriesItems = $$props.seriesItems);
    		if ('conditionsItems' in $$props) $$invalidate(1, conditionsItems = $$props.conditionsItems);
    		if ('reviews' in $$props) $$invalidate(2, reviews = $$props.reviews);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [seriesItems, conditionsItems, reviews];
    }

    class Landing extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Landing",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let t0;
    	let landing;
    	let t1;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	landing = new Landing({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(landing.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(main, "class", "svelte-153arzm");
    			add_location(main, file, 5, 0, 181);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			mount_component(landing, main, null);
    			append_dev(main, t1);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(landing.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(landing.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(landing);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Footer, Header, Landing });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
