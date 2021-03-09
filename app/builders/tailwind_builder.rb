class TailwindBuilder < ActionView::Helpers::FormBuilder
  def text_field(method, opts={})
    default_opts = { class: "mt-2 block w-28 border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
    merged_opts = default_opts.merge(opts)
    super(method, merged_opts)
  end

  def text_area(method, opts={})
    default_opts = { class: "h-36 mt-2 block w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
    merged_opts = default_opts.merge(opts)
    super(method, merged_opts)
  end
end