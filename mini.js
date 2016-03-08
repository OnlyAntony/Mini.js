/* ******************************************************
 * Mini.js - A small, lightweight JavaScript library.
 * Version: 0.1
 *
 * Developed by: Antony Lloyd - antony-lloyd.com
 * ******************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Antony Lloyd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *********************************************************/

function Mini(selector)
{
	if(window === this)
		return new Mini(selector);

	if(selector != null)
	{
		if(selector == "document")
			this.elem								= document;
		else if(selector instanceof HTMLElement)
			this.elem 								= selector;
		else
			this.elem								= document.querySelector(selector);

		if(this.elem === null || this.elem === undefined)
			throw "Cannot find selector";
	}
	return this;
}

/**
 * Parses a functions options
 * @param array defaults The allowed and default values
 * @param array options The function options
 */
Mini.parseOptions 									= function(defaults, options)
{
	if(options !== undefined)
	{
		for(var option in options)
		{
			if(option in defaults)
			{
				defaults[option] 					= options[option];
			}
		}
	}

	return defaults;
}

// ----- Prototype Functions -----

Mini.prototype = {
	/////////////////////////////////////////
	/////////////////////////////////////////
	/////////////// Animations //////////////
	/////////////////////////////////////////
	/////////////////////////////////////////

	/**
	 * Fades out an element
	 * @param array options Options to provide the function
	 */ 
	fadeOut 										: function(options)
	{
		// The default options
		var optionValues							= {
			speed 			: 25,
			callback 		: null,
			callbackArgs 	: null
		};

		optionValues 								= Mini.parseOptions(optionValues, options);

		// The starting opacity
		var opacity 								= 9;

		var elem 									= this.elem;

		function fade()
		{
			// Decrease the opacity
			elem.style.opacity 						= "0." + opacity;
			opacity--;

			// If there is full opacity, stop the fade & interval
			if(opacity == -1)
			{
				window.clearInterval(doFade);

				elem.style.display					= "none";

				if(optionValues["callback"] !== null)
				{
					if(optionValues["callbackArgs"] !== null)
	        			optionValues["callback"](optionValues["callbackArgs"]);
	        		else
	          			optionValues["callback"]();
        		}
			}
		}

		var doFade 									= window.setInterval(fade, optionValues["speed"]);
	},

	/**
	 * Fades in an element
	 * @param array options Options to provide the function
	 */
	fadeIn 											: function(options)
	{
		// The default options
		var optionValues							= {
			speed 			: 25,
			callback 		: null,
			callbackArgs 	: null
		};

		optionValues 								= Mini.parseOptions(optionValues, options);

		// The starting opacity
		var opacity 								= 0;

		// If it is display block, don't fade in
		if(this.elem.style.display === "block")
			return;

		// Set opacity to 0 & show the element
		this.elem.style.opacity 						= 0;
		this.elem.style.display 						= "block";

		var elem 									= this.elem;

		function fade()
		{
			// Increase the opacity
			if(opacity == 10)
	            elem.style.opacity 					= 1;
	        else
	            elem.style.opacity 					= "0." + opacity;

	        opacity++;

	        // If there is no opacity, clear the interval
	        if(opacity == 11)
	        {
	            window.clearInterval(doFade);
	            if(optionValues["callback"] !== null)
				{
					if(optionValues["callbackArgs"] !== null)
	            		optionValues["callback"](optionValues["callbackArgs"]);
	            	else
						optionValues["callback"]();
	            }
	        }
		}

		var doFade 									= window.setInterval(fade, optionValues["speed"]);
	},

	/////////////////////////////////////////
	/////////////////////////////////////////
	///////////////// Events ////////////////
	/////////////////////////////////////////
	/////////////////////////////////////////

	/**
	 * Attatches an event listerner to an element
	 * @param string event The event to listen
	 * @param object func The function to call
	 * @param bool capture Uses capture
	 */
	addListener 									: function(event, func, capture)
	{
		this.elem.addEventListener(event, func, capture);
	}, 

	/**
	 * Removes an event listener from an element
	 * @param string event The event to remove
	 * @param object func The function to remove
	 */
	removeListener 									: function(event, func)
	{
		this.elem.removeEventListener(event, func);
	},

	/**
	 * Attatches a click event to the selector
	 * @param object callback The callback to call on click
	 */
	click 											: function(callback)
	{
		this.addListener("click", callback);
	},

	/**
	 * Attathes a content loaded event to the selector
	 * @param object callback The callback to call on load
	 */
	ready 											: function(callback)
	{
		this.elem.addEventListener("DOMContentLoaded", callback);
	},

	/**
	 * Toggles a class on a selector
	 * @param string classname The class to toggle
	 */
	toggleClass 									: function(classname)
	{
		this.elem.classList.toggle(classname);
	},

	/**
	 * Removes an element from the DOM
	 */
	remove 											: function()
	{
		this.elem.remove();
	},

	/**
	 * Gets all elements that have an attribute within a parent
	 * @param string attribute The attribue to search for
	 * @param string value The value of the attribute
	 * @return array An array of elements
	 */
	getElementsByAttributeValue 					: function(attribute, value)
	{
		var elements 								= [];

		var all 									= this.elem.getElementsByTagName("*");
		for(i = 0; i < all.length; i++)
		{
			if(all[i].getAttribute(attribute) != null)
			{
				if(all[i].getAttribute(attribute) == value)
					elements.push(all[i]);
			}
		}

		return elements;
	},

	/**
	 * Gets all elements that have a tag name within a parent
	 * @param string tag The tag to search for
	 * @param array An array of elements
	 */
	getElementsByTagName 								: function(tag)
	{
		return this.elem.getElementsByTagName(tag);
	},

	/**
	 * Get the length of the selector
	 * @return int The length of the selector
	 */
	count 												: function()
	{
		return this.e.length;
	},

	/**
	 * Gets or sets the value of a element
	 * @param string value If provided, will be set as the element value
	 * @return string The value of the element
	 */
	value 												: function(value)
	{
		if(value !== null)
			this.elem.value 							= value;

		return this.elem.value;
	},

	/**
	 * Gets or sets the inner HTML of an element
	 * @param string html If provided, will be set as the HTML of the element
	 * @return string The element HTML
	 */
	html 												: function(html)
	{
		if(html !== null)
			this.elem.innerHTML 						= html;

		return this.elem.innerHTML;
	},

	/**
	 * Gets or sets the inner text of an element
	 * @param string text If provided, will be set as the inner text of the element
	 * @return string The element inner text
	 */
	text 	 											: function(text)
	{
		if(text !== null)
			this.elem.innerText 						= text;

		return this.elem.innerText;
	},

	/**
	 * Gets or sets an attribute of an element
	 * @param string attr The attribute to get or set
	 * @param string value If provided, will be set as the attribute value
	 * @return string The attribute value
	 */
	attr 												: function(attr, value)
	{
		if(value !== null)
			return this.elem.setAttribute(attr, value);

		return this.elem.getAttribute(attr);
	},

	/**
	 * Appends a element to an element
	 * @param DOMObject e The element to append
	 */
	append 												: function(e)
	{
		this.elem.appendChild(e);
	},

	/**
	 * Sets a CSS property of an object
	 * @param string/object optOrProp Either a property name if used with value, or on its own as a object { <property> : <value> }
	 * @param string value The value of the property
	 */
	css 												: function(optOrProp, value)
	{
		// If optOrProp is a object, it is a list of properties
		if(typeof optOrProp == "object")
		{
			for(opt in optOrProp)
				this.elem.style.cssText 				= opt + ":" + optOrProp[opt];
		}
		else
			this.elem.style.cssText 					= optOrProp + ":" + value;
	}
};

// ----- Functions that do not require an element
Mini.AjaxResponse 										= {
	TEXT 			: 0,
	JSON 			: 1,
	XML 			: 2
};

/**
 * Perform an AJAX request
 * @param string url The URL of the request
 * @param array options Options to provide the function
 */
Mini.ajax 												= function(url, options)
{
	if(url.length === 0)
        throw "AJAX URL cannot be empty"
    else
    {
    	// The default options
		var optionValues								= {
			data 			: null,
			method 			: "GET",
			responseFormat 	: Mini.AjaxResponse.TEXT,
			async 			: true,
			complete 		: null,
			success 		: null,
			fail 			: null
		};

		optionValues 									= Mini.parseOptions(optionValues, options);

		// If the data is passed by the URL
		var urlData 									= false;

		// The data to send
		var formData 									= null;

		// Check the option values are valid
		if(typeof optionValues["data"] === "string")
		{
			// Method is POST
			optionValues["method"] 						= "POST";
			urlData 									= true;
			formData 									= optionValues["data"];
		}
		else if(typeof optionValues["data"] === "object")
		{
			method 										= "POST";
			// Pass the data as a FormData object
			formData 									= new FormData(optionValues["data"]);
		}
		else
			throw "Mini: AJAX data format is invalid";

		optionValues["method"] 							= optionValues["method"].toUpperCase();
		if(optionValues["method"] != "POST" && optionValues["method"] != "GET")
			throw "Mini: AJAX method is invalid";

		if(typeof optionValues["async"] !== "boolean")
			throw "Mini: AJAX async format is invalid";

        var xhr;

		if(window.XMLHttpRequest)
			xhr 										= new XMLHttpRequest();
		else if(window.ActiveXObject) // IE6 & older
			xhr 										= new ActiveXObject("Microsoft.XMLHTTP");

        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4)
            {
            	// If a status of 200, it is successful, otherwise it has failed
            	if(xhr.status == 200)
            	{
                	if(options.success != undefined)
                	{
                		var responseData = null;
                		// Format the response
                		switch(responseFormat)
                		{
                			case Mini.AjaxResponse.JSON:
                				responseData 			= JSON.parse(xhr.responseText);
                			break;
                			case Mini.AjaxResponse.XML:
                				responseData 			= xhr.responseXML;
                			break;
                			default:
                				responseData 			= xhr.responseText;
                			break;
                		}

                		if(optionValues["success"] !== null)
                			optionValues["success"](responseData);
                	}
            	}
                else
                	if(optionValues["fail"] != undefined)
                		optionValues["fail"](xhr, xhr.status);

                // Call the complete function
                if(optionValues["complete"] != undefined)
                	optionValues["complete"](xhr);
            }
        };

        xhr.open(method, url, optionValues["async"]);

        if(urlData)
        	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        if(method == "POST")
        	xhr.send(formData);
        else
        	xhr.send();
    }
};

/**
 * Creates a HTML element based on a HTML string
 * @param string html The HTML to create
 * @return DOMElement The HTML element
 */
Mini.create 											= function(html)
{
	var parts 											= html.split(" ");

	var tag 											= document.createElement(parts[0].substr(1));

	var elemParts 										= html.substr(parts[0].length + 1).replace(/=/g, "").split("'");

	// Loop through each element part, creating the attribute
	for(index = 0; index < elemParts.length; index++)
	{
		var attrName 									= elemParts[index].trim();

		// Check if it is the end tag
		if(index == elemParts.length - 1)
		{
			// Check if there is any innerHTML
			if(attrName != "/>")
				tag.innerHTML 							= attrName.substr(1, attrName.length - (parts[0].length + 3));
		}
		else
		{
			// If the index is true, it is an attribute type
			if(index % 2 == 0)
			{
				var attrValue 							= elemParts[(index + 1)].trim();

				tag.setAttribute(attrName, attrValue);

				index++;
			}
		}
	}

	return tag;
};

/* *** Convert timestamp *** */
Mini.convertTimestamp 									= function(timestamp)
{
	return new Date(timestamp * 1000);
}